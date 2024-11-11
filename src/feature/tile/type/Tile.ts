import {Entity} from "@feature/entity/type";

export type Tile = Entity & {
    x: number;
    y: number;
    width: number;
    height: number;
    imageId: number | null;
};
