import {Entity, Size, Spatial} from "@feature/entity/type";

export type Area = Entity & Spatial & Size & {
    points: {x: number; y: number}[];

    footnoteId: number | null;
};