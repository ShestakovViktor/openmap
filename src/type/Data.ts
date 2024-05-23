import {Entity, Asset, Id, Type, Param} from "@type";

export type Data = {
    system: {[key: Id]: Param};
    config: {[key: Id]: Param};
    asset: {[key: Id]: Asset};
    assetType: {[key: Id]: Type};
    entity: {[key: Id]: Entity};
    entityType: {[key: Id]: Type};
};