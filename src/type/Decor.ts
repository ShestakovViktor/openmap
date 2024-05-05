import {Entity, Id} from "@type";

export type Decor = Entity & {
    x: number;
    y: number;
    propId: Id | null;
    motionId: Id | null;
};