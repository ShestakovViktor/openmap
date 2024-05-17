import {Entity} from "./Entity";

export type Layer = Entity & {
    name: string;
    childIds: number[];
};
