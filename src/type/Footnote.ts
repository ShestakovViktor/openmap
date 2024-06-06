import {Entity, Id} from "@type";

export type Footnote = Entity & {
    text: string;
    figureIds: (Id | null)[];
};