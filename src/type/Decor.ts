import {Entity, Id} from "@type";

export type Decor = Entity & {
    x: number;
    y: number;
    assetId: Id | null;
    motionId: Id | null;
};