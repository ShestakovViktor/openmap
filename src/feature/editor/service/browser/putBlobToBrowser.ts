export async function putBlobToBrowser(
    name: string,
    file: Blob
): Promise<void> {
    const persistent = await navigator.storage.persist();
    if (persistent) {
        console.log("Storage will not be cleared except by explicit user action");
    }
    else {
        console.log("Storage may be cleared by the UA under storage pressure.");
    }

    const root = await navigator.storage.getDirectory();

    const dataFileHandle = await root.getFileHandle(name, {create: true});
    const dataFileWritableStream = await dataFileHandle.createWritable();
    await dataFileWritableStream.write(file);
    await dataFileWritableStream.close();
}
