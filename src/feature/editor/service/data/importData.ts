import {ArchiveDriver} from "@interface";
import {Data} from "@type";

async function handleData(files: {[key: string]: Blob}): Promise<Data> {
    const dataString = await files["data.json"].text();
    const data = JSON.parse(dataString) as Data;

    for (const id in data.asset) {
        const asset = data.asset[id];
        if (!asset.path) throw new Error("");
        asset.path = URL.createObjectURL(files[asset.path]);
    }

    return data;
}

export async function importData(
    archive: Blob,
    archiveDriver: ArchiveDriver
): Promise<Data> {
    const files = await archiveDriver.extract(archive);
    const data = await handleData(files);
    return data;
}
