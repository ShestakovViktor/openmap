import {Id} from "@type";

export type Asset = {
    id: Id;
    typeId: Id | null;

    path: string;
    data: string;
    media: string;
    encoding: string;
};