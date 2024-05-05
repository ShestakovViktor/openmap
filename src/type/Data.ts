import {Entity, Asset, Id, Type, Param} from "@type";

export type Data = {
    config: {[key: Id]: Param};
    type: {[key: Id]: Type};
    asset: {[key: Id]: Asset};
    entity: {[key: Id]: Entity};
};