export async function getBlobFromBrowser(
    name: string
): Promise<Blob> {
    const root = await navigator.storage.getDirectory();
    const dataFileHandle = await root.getFileHandle(name);
    const blob = await dataFileHandle.getFile();
    return blob;
}