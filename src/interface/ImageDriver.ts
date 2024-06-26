export type ImageTile = {
    x: number;
    y: number;
    width: number;
    height: number;
    media: string;
    encoding: string;
    data: string;
    size: number;
};

export interface ImageDriver {
    initImage(
        blob: Blob,
        mime: string
    ): Promise<{
        width: number;
        height: number;
        tiles: ImageTile[];
    }>;

    fooImage(
        file: File,
        width: number,
        height: number,
        mime: string
    ): Promise<string>;
}