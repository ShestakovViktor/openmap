import {ArchiveDriver} from "@interface";
import {Data} from "@type";
import {getAssetsBlobs, getDataBlob} from "@feature/editor/service/data";

async function dataToBlobs(
    data: Data
): Promise<{[key: string]: Blob}> {
    return {
        ...await getAssetsBlobs(data.asset),
        ...getDataBlob(data),
    };
}

export async function archiveData(
    archiveDriver: ArchiveDriver,
    data: Data
): Promise<Blob> {
    const dataClone = JSON.parse(JSON.stringify(data));
    const blobs = await dataToBlobs(dataClone);
    return await archiveDriver.archive(blobs);
}