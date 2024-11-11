import {Param} from "@type";
import {exportDataAsFile} from "./exportDataAsProject";
import {ArchiveDriver} from "@interface";
import {Store} from "@feature/store";

export async function exportProject(
    store: Store,
    archiveDriver: ArchiveDriver
): Promise<void> {
    const data = store.extract();

    const {value: projectName} = store.config
        .getByParams<Param & {value: string}>({name: "name"})[0];

    const projectFile = await exportDataAsFile(archiveDriver, data);

    const projectFileUrl = URL.createObjectURL(projectFile);

    const tempLink = document.createElement("a");
    tempLink.download = projectName + ".om";
    tempLink.href = projectFileUrl;
    tempLink.click();
    tempLink.remove();
}
