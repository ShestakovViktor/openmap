import {Entity, Size, Spatial} from "@feature/entity/type";

export type Decor = Entity & Spatial & Size & {
    propId: number | null;
    motionId: number | null;
};