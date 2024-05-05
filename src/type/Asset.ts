import {Id} from "@type";

export type Asset = {
    id: Id;
    typeId: Id | null;

    mime: string;
    path: string;
    content: string;
};