import {Entity, Id} from "@type";

export type Marker = Entity & {
    x: number;
    y: number;
    assetId: Id | undefined;

    text: string;
    graphicIds: Id[];
};