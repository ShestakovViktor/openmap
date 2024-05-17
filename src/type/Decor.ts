import {Entity, Id} from "@type";

export type Decor = Entity & {
    x: number;
    y: number;
    width: number;
    height: number;
    propId: Id | null;
    motionId: Id | null;
};