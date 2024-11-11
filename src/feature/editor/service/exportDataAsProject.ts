import {Asset} from "@feature/asset/type";
import {ArchiveDriver} from "@interface";
import {Data} from "@type";

function splitAssetToBase64(assets: {[key: number]: Asset}): [
    {[key: number]: Asset},
    {[key: string]: Blob},
] {
    const records: {[key: number]: Asset} = {};
    const blobs: {[key: string]: Blob} = {};

    for (const id in assets) {
        const asset = assets[id];
        if (!asset.data) throw new Error("");
        const contentBlob = new Blob([asset.data], {type: "text/plain"});

        const path = `asset/${id}.${asset.encoding}`;
        records[asset.id] = {...asset, path, data: ""};
        blobs[path] = contentBlob;
    }

    return [records, blobs];
}

function exportData(projectData: Data): {[key: string]: Blob} {
    const [asset, blobs] = splitAssetToBase64(projectData.asset);
    const data = {...projectData, asset};

    const dataString = JSON.stringify(data, null, 4);
    const dataType = "application/json;charset=utf-8";
    const dataBlob = new Blob([dataString], {type: dataType});

    return {["data.json"]: dataBlob, ...blobs};
}

export async function exportDataAsFile(
    archiveDriver: ArchiveDriver,
    data: Data
): Promise<Blob> {
    const blobs = exportData(data);
    return await archiveDriver.archive(blobs);
}