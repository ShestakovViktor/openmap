import {Data, Entity, Type, Group, Asset, Param} from "@type";
import {Collection} from "@core";
import {AssetType, EntityType, LayerName} from "@enum";

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
                1: {id: 1, name: EntityType.GROUP},
                2: {id: 2, name: EntityType.TILE},
                3: {id: 3, name: EntityType.MARKER},
                4: {id: 4, name: EntityType.DECOR},
                5: {id: 5, name: EntityType.AREA},

                50: {id: 50, name: AssetType.IMAGE},
                51: {id: 51, name: AssetType.PROP},
                55: {id: 55, name: AssetType.MOTION},
            },
            entity: {
                1: {
                    id: 1,
                    typeId: 1,
                    name: LayerName.ROOT,
                    childrenIds: [2, 3, 4],
                } as Group,
                2: {
                    id: 2,
                    name: LayerName.MAP,
                    typeId: 1,
                    childrenIds: [],
                } as Group,
                3: {
                    id: 3,
                    name: LayerName.OVERLAY,
                    typeId: 1,
                    childrenIds: [],
                } as Group,
                4: {
                    id: 4,
                    name: LayerName.STYLE,
                    typeId: 1,
                    childrenIds: [],
                } as Group,
            },
            asset: {},
        };

        return Object.assign(data, params);
    }
}