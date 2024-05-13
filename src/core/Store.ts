import {Data, Entity, Type, Group, Asset, Param} from "@type";
import {Collection} from "@core";
import {ASSET, ENTITY, LAYER} from "@enum";

export class Store {
    private data!: Data;

    public config!: Collection<Param>;

    public type!: Collection<Type>;

    public asset!: Collection<Asset>;

    public entity!: Collection<Entity>;

    constructor(data?: Partial<Data>) {
        this.setData(data);
    }

    setData(data?: Partial<Data>): void {
        this.data = this.initData(data);
        this.config = new Collection<Param>(this.data.config);
        this.type = new Collection<Type>(this.data.type);
        this.asset = new Collection<Asset>(this.data.asset);
        this.entity = new Collection<Entity>(this.data.entity);
    }

    getData(): Data {
        return this.data;
    }

    initData(params?: Partial<Data>): Data {
        const data: Data = {
            config: {
                1: {id: 1, name: "name", value:  "New project"},
                2: {id: 2, name: "width", value: 0},
                3: {id: 3, name: "height", value: 0},
            },
            type: {
                1: {id: 1, name: ENTITY.GROUP},
                2: {id: 2, name: ENTITY.TILE},
                3: {id: 3, name: ENTITY.MARKER},
                4: {id: 4, name: ENTITY.DECOR},
                5: {id: 5, name: ENTITY.AREA},

                50: {id: 50, name: ASSET.IMAGE},
                51: {id: 51, name: ASSET.PROP},
                55: {id: 55, name: ASSET.MOTION},
            },
            entity: {
                1: {
                    id: 1,
                    typeId: 1,
                    name: LAYER.ROOT,
                    childIds: [2, 3, 4],
                } as Group,
                2: {
                    id: 2,
                    name: LAYER.MAP,
                    typeId: 1,
                    childIds: [],
                } as Group,
                3: {
                    id: 3,
                    name: LAYER.OVERLAY,
                    typeId: 1,
                    childIds: [],
                } as Group,
                4: {
                    id: 4,
                    name: LAYER.STYLE,
                    typeId: 1,
                    childIds: [],
                } as Group,
            },
            asset: {},
        };

        return Object.assign(data, params);
    }
}