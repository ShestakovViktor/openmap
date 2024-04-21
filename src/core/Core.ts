import {Invoker, Converter, Store} from "@core";
import {WebArchiveDriver, WebImageDriver} from "@core/driver";
import {ArchiveDriver, ImageDriver} from "@src/interface";
import {Group, Id, Motion, Source, Tile, Asset} from "@type";
import {EntityType, LayerName} from "@enum";

export class Core {
    public invoker = new Invoker();

    private archiveDriver: ArchiveDriver;

    private imageDriver: ImageDriver;

    public converter: Converter;

    constructor(private store: Store) {
        this.imageDriver = new WebImageDriver();
        this.archiveDriver = new WebArchiveDriver();

        this.converter = new Converter(this.store, this.archiveDriver);
    }

    async initProject(params: {
        projectName: string;
        mapFile: File;
    }): Promise<void> {
        const mime = "image/jpeg";
        const {width, height, tiles} = await this.imageDriver
            .initImage(params.mapFile, mime);

        this.store.setData({
            config: {
                1: {id: 1, name: "name", value: params.projectName},
                2: {id: 2, name: "width", value: width},
                3: {id: 3, name: "height", value: height},
            },
        });

        const map = this.store.entity
            .getByParams<Group>({name: LayerName.MAP})[0];

        const {id: typeId} = this.store.type
            .getByParams({name: EntityType.TILE})[0];

        const tileIds = tiles.map((tile) => {
            const sourceId = this.store.source.add<Source>({
                content: tile.base64,
                path: "",
                mime,
            });

            const tileId = this.store.entity.add<Tile>({
                typeId,
                x: tile.x,
                y: tile.y,
                width: tile.width,
                height: tile.height,
                sourceId,
            });

            return tileId;
        });

        this.store.entity.set<Group>({id: map.id, childrenIds: tileIds});
    }

    async initAsset({name, file, width, height}: {
        name: string;
        width: number;
        height: number;
        file: File;
    }): Promise<Id> {
        const mime = "image/png";
        const base64 = await this.imageDriver
            .fooImage(file, width, height, mime);

        const sourceId = this.store.source
            .add({content: base64, path: "", mime});

        const {id: typeId} = this.store.type
            .getByParams({name: EntityType.ASSET})[0];

        const assetId = this.store.entity
            .add<Asset>({typeId, name, sourceId});

        return assetId;
    }

    initMotion(motionData: {
        name: string;
        class: string;
        source: string;
    }): Id {
        const mime = "text/css";

        const {id: typeId} = this.store.type
            .getByParams({name: EntityType.MOTION})[0];

        const sourceId = this.store.source.add({
            content: motionData.source,
            path: "",
            mime,
        });

        const motionId = this.store.entity.add<Motion>({
            name: motionData.name,
            class: motionData.class,
            typeId,
            sourceId,
        });

        const styleLayer = this.store.entity.getByParams<Group>({
            name: LayerName.STYLE,
        })[0];

        styleLayer.childrenIds.push(motionId);

        this.store.entity.set<Group>(styleLayer);

        return motionId;
    }
}