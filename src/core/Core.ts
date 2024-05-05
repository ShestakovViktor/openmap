import {Invoker, Converter, Store} from "@core";
import {WebArchiveDriver, WebImageDriver} from "@core/driver";
import {ArchiveDriver, ImageDriver} from "@src/interface";
import {Group, Id, Motion, Tile, Asset, Image} from "@type";
import {AssetType, EntityType, LayerName} from "@enum";

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

        const {id: tileTypeId} = this.store.type
            .getByParams({name: EntityType.TILE})[0];

        const {id: imageTypeId} = this.store.type
            .getByParams({name: AssetType.IMAGE})[0];

        const tileIds = tiles.map((tile) => {
            const imageId = this.store.asset.add<Image>({
                typeId: imageTypeId,
                content: tile.base64,
                path: "",
                mime,
            });

            const tileId = this.store.entity.add<Tile>({
                typeId: tileTypeId,
                x: tile.x,
                y: tile.y,
                width: tile.width,
                height: tile.height,
                imageId,
            });

            return tileId;
        });

        this.store.entity.set<Group>({id: map.id, childIds: tileIds});
    }

    async initProp({name, file, width, height}: {
        name: string;
        width: number;
        height: number;
        file: File;
    }): Promise<Id> {
        const mime = "image/png";
        const base64 = await this.imageDriver
            .fooImage(file, width, height, mime);

        const {id: propTypeId} = this.store.type
            .getByParams({name: AssetType.PROP})[0];

        const propId = this.store.asset
            .add({typeId: propTypeId, content: base64, path: "", mime});

        return propId;
    }

    initMotion(motionData: {
        name: string;
        class: string;
        source: string;
    }): Id {
        const mime = "text/css";

        const {id: motionTypeId} = this.store.type
            .getByParams({name: AssetType.MOTION})[0];

        const motionId = this.store.asset.add<Motion>({
            typeId: motionTypeId,
            content: motionData.source,
            path: "",
            class: motionData.class,
            name: motionData.name,
            mime,
        });

        return motionId;
    }
}