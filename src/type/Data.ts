import {Entity, Id, Type, Source, Param} from "@type";

export type Data = {
    config: {[key: Id]: Param};
    source: {[key: Id]: Source};
    type: {[key: Id]: Type};
    entity: {[key: Id]: Entity};
};