import {Entity} from "@type";

export type Tile = Entity & {
    x: number;
    y: number;
    width: number;
    height: number;
    sourceId: number;
};
