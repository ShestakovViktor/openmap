import {Asset} from "@feature/asset/type";
import {ArchiveDriver} from "@interface";
import {Data} from "@type";
import {Media} from "@feature/editor/utility";

function base64toBytes(base64String: string): Uint8Array {
    const byteCharacters = atob(base64String);
    const byteArrays = [];

    for (let i = 0; i < byteCharacters.length; i++) {
        byteArrays.push(byteCharacters.charCodeAt(i));
    }

    const byteArray = new Uint8Array(byteArrays);

    return byteArray;
}

function splitAssetsToFiles(
    input: {[key: number]: Asset}
): [{[key: number]: Asset}, {[key: number]: Blob}] {

    const output: {[key: number]: Asset} = {};
    const blobs: {[key: string]: Blob} = {};

    const media = new Media();

    for (const id in input) {
        const asset = input[id];
        if (!asset.data) throw new Error();
        const assetDataBytes = base64toBytes(asset.data);
        const extension = media.typeToExtension(asset.media);

        const relativePath = `/${extension}/${id}.${extension}`;

        output[id] = {
            ...asset,
            path: relativePath,
            data: "",
        };

        const absolutePath = `data/${relativePath}`;

        blobs[absolutePath] = new Blob([assetDataBytes], {type: asset.media});
    }

    return [output, blobs];
}

function getDataBlob(data: Data): {[key: string]: Blob} {
    const dataString = JSON.stringify(data, null, 4);
    const dataBlob = new Blob([dataString], {type: "application/json"});
    return {["data/data.json"]: dataBlob};
}

async function getTemplateBlob(): Promise<{[key: string]: Blob}> {
    const fileName = "viewer.html";
    const response = await fetch(fileName);
    const viewerTemplate = await response.text();

    const blob = new Blob([viewerTemplate], {type: "text/html"});

    return {["viewer.html"]: blob};
}

async function getBundleBlob(): Promise<{[key: string]: Blob}> {
    const fileName = "viewer.js";
    const response = await fetch(fileName);
    const viewerBundle = await response.blob();

    return {["viewer.js"]: viewerBundle};
}

async function exportStatic(data: Data): Promise<{[key: string]: Blob}> {
    const [asset, blobs] = splitAssetsToFiles(data.asset);

    return {
        ...blobs,
        ...getDataBlob({...data, asset}),
        ...await getBundleBlob(),
        ...await getTemplateBlob(),
    };
}

export async function exportDataAsSite(
    archiveDriver: ArchiveDriver,
    data: Data
): Promise<Blob> {
    const blobs = await exportStatic(data);
    return await archiveDriver.archive(blobs);
}