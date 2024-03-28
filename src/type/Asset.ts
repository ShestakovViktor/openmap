import {Entity, Id} from "@type";

export type Asset = Entity & {
    name: string;
    sourceId: Id;
};