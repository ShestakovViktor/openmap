import {Id} from "@type";

export type Asset = {
    id: Id;
    assetTypeId: Id | null;

    name: string;
    path: string;
    data: string;
    media: string;
    encoding: string;
};