import {ArchiveDriver} from "@interface";
import {Data} from "@type";

async function importData(files: {[key: string]: Blob}): Promise<Data> {
    const dataString = await files["data.json"].text();
    const data = JSON.parse(dataString) as Data;

    for (const id in data.asset) {
        const asset = data.asset[id];
        if (!asset.path) throw new Error("");
        asset.data = await files[asset.path].text();
        asset.path = "";
    }

    return data;
}

export async function importDataFromArchive(
    archiveDriver: ArchiveDriver,
    blob: Blob
): Promise<Data> {
    const files = await archiveDriver.extract(blob);
    const data = await importData(files);
    return data;
}
