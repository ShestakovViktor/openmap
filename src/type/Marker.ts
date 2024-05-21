import {Entity, Id} from "@type";

export type Marker = Entity & {
    x: number;
    y: number;
    width: number;
    height: number;

    propId: Id | null;

    text: string;
    figureIds: Id[];
};