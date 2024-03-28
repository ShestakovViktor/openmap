import {Data, Entity, Type, Group, Source, Param} from "@type";
import {Collection} from "@core";
import {EntityType, LayerName} from "@enum";

export class Store {
    private data!: Data;

    public config!: Collection<Param>;

    public type!: Collection<Type>;

    public source!: Collection<Source>;

    public entity!: Collection<Entity>;

    constructor(data?: Partial<Data>) {
        this.setData(data);
    }

    setData(data?: Partial<Data>): void {
        this.data = this.initData(data);
        this.config = new Collection<Param>(this.data.config);
        this.type = new Collection<Type>(this.data.type);
        this.source = new Collection<Source>(this.data.source);
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
                4: {id: 4, name: "row", value: 0},
                5: {id: 5, name: "column", value: 0},
            },
            type: {
                1: {id: 1, name: EntityType.GROUP},
                2: {id: 2, name: EntityType.TILE},
                3: {id: 3, name: EntityType.MARKER},
                4: {id: 4, name: EntityType.DECOR},
                5: {id: 5, name: EntityType.FIELD},
                6: {id: 6, name: EntityType.ASSET},
                7: {id: 7, name: EntityType.MOTION},
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
            source: {},
        };

        return Object.assign(data, params);
    }
}