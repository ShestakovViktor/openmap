import {Entity, Id} from "@type";

export type Area = Entity & {
    x: number;
    y: number;
    width: number;
    height: number;
    points: {x: number; y: number}[];
    text: string;
    graphicIds: Id[];
};