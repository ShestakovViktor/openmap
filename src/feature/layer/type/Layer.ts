import {Entity, Spatial, Parent} from "@feature/entity/type";

export type Layer = Entity & Spatial & Parent & {
    name: string;
    displayOptionIds: number[];
};
