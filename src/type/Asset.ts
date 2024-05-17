import {Id} from "@type";

export type Asset = {
    id: Id;
    assetTypeId: Id | null;

    path: string;
    data: string;
    media: string;
    encoding: string;
};