import {Entity, Id} from "@type";

export type Tile = Entity & {
    x: number;
    y: number;
    width: number;
    height: number;
    imageId: Id | null;
};
