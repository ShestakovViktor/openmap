import {Entity, Id} from "@type";

export type Marker = Entity & {
    x: number;
    y: number;
    propId: Id | null;

    text: string;
    graphicIds: Id[];
};