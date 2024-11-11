import {Entity} from "@feature/entity/type";

export type Parent = Entity & {
    childIds: number[];
};