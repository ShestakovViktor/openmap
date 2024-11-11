import {Type, Param, Entities, Assets} from "@type";

export type Data = {
    system: {[key: number]: Param};
    config: {[key: number]: Param};
    asset: {[key: number]: Assets};
    assetType: {[key: number]: Type};
    entity: {[key: number]: Entities};
    entityType: {[key: number]: Type};
    displayOption: {[key: number]: Type};
};