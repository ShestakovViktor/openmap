import {Entity, Size, Spatial} from "@feature/entity/type";

export type Marker = Entity & Spatial & Size & {
    propId: number | null;
    footnoteId: number | null;
};