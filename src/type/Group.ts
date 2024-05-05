import {Entity} from "./Entity";

export type Group = Entity & {
    name: string;
    childIds: number[];
};
