import {Entity, Id} from "@type";

export type Marker = Entity & {
    x: number;
    y: number;
    assetId: Id;

    text: string;
    graphicIds: Id[];
};