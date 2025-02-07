import {ArchiveDriver} from "@interface";
import {Data} from "@type";
import {getAssetsBlobs, getDataBlob} from "@feature/editor/service/data";

async function getTemplateBlob(): Promise<Blob> {
    const fileName = "viewer.html";
    const response = await fetch(fileName);
    const viewerTemplate = await response.text();
    const template = new Blob([viewerTemplate], {type: "text/html"});

    return template;
}

async function getBundleBlob(): Promise<Blob> {
    const fileName = "viewer.js";
    const response = await fetch(fileName);
    const bundle = await response.blob();

    return bundle;
}

async function dataToBlobs(data: Data): Promise<{[key: string]: Blob}> {
    const blobs = {
        ...await getAssetsBlobs(data.asset),
        ...getDataBlob(data),
    };

    for (const path in blobs) {
        blobs["project/" + path] = blobs[path];
        delete blobs[path];
    }

    return {
        "viewer.html": await getTemplateBlob(),
        "viewer.js": await getBundleBlob(),
        ...blobs,
    };
}

export async function compileData(
    archiveDriver: ArchiveDriver,
    data: Data
): Promise<Blob> {
    const dataClone = JSON.parse(JSON.stringify(data));
    const blobs = await dataToBlobs(dataClone);
    return await archiveDriver.archive(blobs);
}