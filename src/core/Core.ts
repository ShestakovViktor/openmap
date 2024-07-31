import {Invoker, Converter, Store} from "@core";
import {WebArchiveDriver, WebImageDriver} from "@core/driver";
import {ArchiveDriver, ImageDriver} from "@src/interface";
import {Layer, Tile, Image, Data} from "@type";
import {ASSET, ENTITY, LAYER} from "@enum";

export class Core {
    public invoker = new Invoker();

    private archiveDriver: ArchiveDriver;

    private imageDriver: ImageDriver;

    public converter: Converter;

    constructor(private store: Store) {
        this.store.setData(this.initData());
        this.imageDriver = new WebImageDriver();
        this.archiveDriver = new WebArchiveDriver();
        this.converter = new Converter(this.archiveDriver);
    }

    initData(params?: Partial<Data>): Data {
        const data: Data = {
            system: {
                1: {id: 1, name: "package", value: "0.0.1"},
                2: {id: 2, name: "schema", value: 1},
            },
            config: {
                1: {id: 1, name: "name", value: "New project"},
                2: {id: 2, name: "width", value: 0},
                3: {id: 3, name: "height", value: 0},
            },
            entityType: {
                [ENTITY.ENTITY]: {id: ENTITY.ENTITY, name: "entity"},
                [ENTITY.LAYER]: {id: ENTITY.LAYER, name: "layer"},
                [ENTITY.TILE]: {id: ENTITY.TILE, name: "tile"},
                [ENTITY.FOOTNOTE]: {id: ENTITY.FOOTNOTE, name: "footnote"},
                [ENTITY.MARKER]: {id: ENTITY.MARKER, name: "marker"},
                [ENTITY.DECOR]: {id: ENTITY.DECOR, name: "decor"},
                [ENTITY.AREA]: {id: ENTITY.AREA, name: "area"},
            },
            assetType: {
                [ASSET.ASSET]: {id: ASSET.ASSET, name: "asset"},
                [ASSET.IMAGE]: {id: ASSET.IMAGE, name: "image"},
                [ASSET.PROP]: {id: ASSET.PROP, name: "prop"},
                [ASSET.FIGURE]: {id: ASSET.FIGURE, name: "figure"},
                [ASSET.MOTION]: {id: ASSET.MOTION, name: "motion"},
            },
            entity: {
                1: {
                    id: 1,
                    entityTypeId: ENTITY.LAYER,
                    name: LAYER.ROOT,
                    parentId: null,
                    childIds: [2, 3],
                } as Layer,
                2: {
                    id: 2,
                    entityTypeId: ENTITY.LAYER,
                    name: LAYER.BACKGROUND,
                    parentId: 1,
                    childIds: [],
                } as Layer,
                3: {
                    id: 3,
                    entityTypeId: ENTITY.LAYER,
                    name: LAYER.OVERLAY,
                    parentId: 1,
                    childIds: [],
                } as Layer,
            },
            asset: {},
        };

        return Object.assign(data, params);
    }

    async initProject(params: {
        name: string;
        map: File;
    }): Promise<void> {
        const mime = "image/jpeg";
        const {width, height, tiles: imageTiles} = await this.imageDriver
            .initImage(params.map, mime);

        const data = this.initData({
            config: {
                1: {id: 1, name: "name", value: params.name},
                2: {id: 2, name: "width", value: width},
                3: {id: 3, name: "height", value: height},
            },
        });

        this.store.setData(data);

        const parent = this.store.entity
            .getByParams<Layer>({name: LAYER.BACKGROUND})[0];

        imageTiles.forEach((imageTile, index) => {
            const image = this.store.asset.create<Image>({
                assetTypeId: ASSET.IMAGE,
                name: `tile ${index + 1}`,
                data: imageTile.data,
                media: imageTile.media,
                encoding: imageTile.encoding,
                path: "",
                size: imageTile.size,
            });

            const tile = this.store.entity.create<Tile>({
                entityTypeId: ENTITY.TILE,
                x: imageTile.x,
                y: imageTile.y,
                width: imageTile.width,
                height: imageTile.height,
                parentId: parent.id,
                imageId: image.id,
            });

            parent.childIds.push(tile.id);
        });
    }
}