import {ArchiveDriver} from "@interface";
import {exportDataAsSite} from "./exportDataAsSite";
import {Store} from "@feature/store";

export async function compileProject(
    store: Store,
    archiveDriver: ArchiveDriver
): Promise<void> {
    const data = store.extract();
    const {value: name} = store.config
        .getByParams({name: "name"})[0];

    const websiteArchive = await exportDataAsSite(archiveDriver, data);

    const projectFileUrl = URL.createObjectURL(websiteArchive);

    const tempLink = document.createElement("a");
    tempLink.download = `${name}.zip`;
    tempLink.href = projectFileUrl;
    tempLink.click();
    tempLink.remove();
}