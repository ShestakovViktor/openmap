export type Asset = {
    id: number;
    assetTypeId: number | null;

    size: number;
    name: string;
    path: string;
    data: string;
    media: string;
};