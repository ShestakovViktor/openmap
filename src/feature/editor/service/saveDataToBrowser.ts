import {Store} from "@feature/store";

export async function saveDataToBrowser(store: Store): Promise<void> {
    const data = store.extract();
    const persistent = await navigator.storage.persist();
    if (persistent) {
        console.log("Storage will not be cleared except by explicit user action");
    }
    else {
        console.log("Storage may be cleared by the UA under storage pressure.");
    }

    const root = await navigator.storage.getDirectory();

    const dataFileHandle = await root.getFileHandle("data.om", {create: true});
    const dataFileWritableStream = await dataFileHandle.createWritable();
    await dataFileWritableStream.write(JSON.stringify(data));
    await dataFileWritableStream.close();
}