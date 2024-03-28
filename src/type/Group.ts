import {Entity} from "./Entity";

export type Group = Entity & {
    name: string;
    childrenIds: number[];
};
