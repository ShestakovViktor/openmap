import {ASSET_TYPE} from "@feature/asset/enum";
import {DISPLAY_OPTION} from "@feature/entity/enum";
import {ENTITY_TYPE} from "@feature/entity/enum";
import {Layer} from "@feature/layer/type";
import {Data, Param} from "@type";

export function initData(config?: {[key: number]: Param}): Data {
    const data: Data = {
        system: {
            1: {id: 1, name: "package", value: "0.0.1"},
            2: {id: 2, name: "schema", value: 1},
        },
        config: {
            1: {id: 1, name: "name", value: "New project"},
            2: {id: 2, name: "width", value: 0},
            3: {id: 3, name: "height", value: 0},
            4: {id: 4, name: "minScale", value: 0.5},
            5: {id: 5, name: "maxScale", value: 2},
        },
        entityType: {
            [ENTITY_TYPE.ENTITY]: {
                id: ENTITY_TYPE.ENTITY,
                name: "entity",
            },
            [ENTITY_TYPE.LAYER]: {
                id: ENTITY_TYPE.LAYER,
                name: "layer",
            },
            [ENTITY_TYPE.TILE]: {
                id: ENTITY_TYPE.TILE,
                name: "tile",
            },
            [ENTITY_TYPE.FOOTNOTE]: {
                id: ENTITY_TYPE.FOOTNOTE,
                name: "footnote",
            },
            [ENTITY_TYPE.MARKER]: {
                id: ENTITY_TYPE.MARKER,
                name: "marker",
            },
            [ENTITY_TYPE.DECOR]: {
                id: ENTITY_TYPE.DECOR,
                name: "decor",
            },
            [ENTITY_TYPE.AREA]: {
                id: ENTITY_TYPE.AREA,
                name: "area",
            },
        },
        assetType: {
            [ASSET_TYPE.ASSET]: {
                id: ASSET_TYPE.ASSET,
                name: "asset",
            },
            [ASSET_TYPE.IMAGE]: {
                id: ASSET_TYPE.IMAGE,
                name: "image",
            },
            [ASSET_TYPE.PROP]: {
                id: ASSET_TYPE.PROP,
                name: "prop",
            },
            [ASSET_TYPE.FIGURE]: {
                id: ASSET_TYPE.FIGURE,
                name: "figure",
            },
            [ASSET_TYPE.MOTION]: {
                id: ASSET_TYPE.MOTION,
                name: "motion",
            },
        },
        displayOption: {
            [DISPLAY_OPTION.MOVABLE]: {
                id: DISPLAY_OPTION.MOVABLE,
                name: "movable",
            },
            [DISPLAY_OPTION.SCALABLE]: {
                id: DISPLAY_OPTION.SCALABLE,
                name: "scalable",
            },
        },
        entity: {
            1: {
                id: 1,
                entityTypeId: ENTITY_TYPE.LAYER,
                name: "",
                parentId: null,
                childIds: [2, 3],
                x: 0,
                y: 0,
                displayOptionIds: [DISPLAY_OPTION.MOVABLE],
            } as Layer,
            2: {
                id: 2,
                entityTypeId: ENTITY_TYPE.LAYER,
                name: "",
                parentId: 1,
                childIds: [],
                x: 0,
                y: 0,
                displayOptionIds: [DISPLAY_OPTION.SCALABLE],
            } as Layer,
            3: {
                id: 3,
                entityTypeId: ENTITY_TYPE.LAYER,
                name: "",
                parentId: 1,
                childIds: [],
                x: 0,
                y: 0,
                displayOptionIds: [],
            } as Layer,
        },
        asset: {},
    };

    Object.assign(data.config, config);

    return data;
}