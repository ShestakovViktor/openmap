import {Entity, Id} from "@type";

export type Motion = Entity & {
    name: string;
    class: string;
    sourceId: Id;
};