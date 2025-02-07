import {Asset} from "@feature/asset/type";
import {typeToExtension} from "@feature/editor/service";

async function getAssetBlob (asset: Asset): Promise<[string, Blob]> {
    const response = await fetch(asset.path);
    const blob = await response.blob();
    const ext = typeToExtension(asset.media);
    const path = `asset/${asset.id}.${ext}`;

    asset.path = path;

    return [path, blob];
}

export async function getAssetsBlobs(
    assets: {[key: number]: Asset}
): Promise<{[key: string]: Blob}> {
    const promises: Promise<[string, Blob]>[] = [];

    for (const id in assets) {
        promises.push(getAssetBlob(assets[id]));
    }

    const blobs = Object.fromEntries(await Promise.all(promises));

    return blobs;
}