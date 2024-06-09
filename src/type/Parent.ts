import {Entity, Id} from "@type";

export type Parent = Entity & {
    childIds: Id[];
};