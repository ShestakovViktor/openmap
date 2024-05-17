import {Invoker, Converter, Store} from "@core";
import {WebArchiveDriver, WebImageDriver} from "@core/driver";
import {ArchiveDriver, ImageDriver} from "@src/interface";
import {Group, Tile, Image} from "@type";
import {ASSET, ENTITY, LAYER} from "@enum";

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
        name: string;
        map: File;
    }): Promise<void> {
        const mime = "image/jpeg";
        const {width, height, tiles} = await this.imageDriver
            .initImage(params.map, mime);

        this.store.setData({
            config: {
                1: {id: 1, name: "name", value: params.name},
                2: {id: 2, name: "width", value: width},
                3: {id: 3, name: "height", value: height},
            },
        });

        const map = this.store.entity
            .getByParams<Group>({name: LAYER.MAP})[0];

        const tileIds = tiles.map((tile) => {
            const imageId = this.store.asset.add<Image>({
                assetTypeId: ASSET.IMAGE.id,
                data: tile.data,
                media: tile.media,
                encoding: tile.encoding,
                path: "",
            });

            const tileId = this.store.entity.add<Tile>({
                entityTypeId: ENTITY.TILE.id,
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
}