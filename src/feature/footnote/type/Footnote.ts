import {Entity} from "@feature/entity/type";

export type Footnote = Entity & {
    text: string;
    figureIds: (number | null)[];
};