import styles from "./StartPage.module.scss";
import en from "./string/en.json";

import {Button, Page} from "@shared/widget";

import i18next from "i18next";
import {JSX} from "solid-js";
import {Data} from "@type";
import {useStartupContext} from "@feature/editor/context";
import {importDataFromArchive} from "@feature/editor/service";
import {WebArchiveDriver} from "@feature/editor/driver";

i18next.addResourceBundle("en", "editor", {StartChoice: en}, true, true);

export function StartPage(): JSX.Element {
    const startupCtx = useStartupContext();
    const [,setData] = startupCtx.dataSignal;
    const [,setPage] = startupCtx.pageSignal;

    async function handleProjectRestore(): Promise<void> {
        const root = await navigator.storage.getDirectory();
        const dataFileHandle = await root.getFileHandle("data.om");
        const dataFile = await dataFileHandle.getFile();
        const dataString = await dataFile.text();
        const data = JSON.parse(dataString) as Data;

        setData(data);
    }

    function handleProjectUpload(): void {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = ".om";
        input.click();
        input.addEventListener("change", (): void => {
            if (!input.files?.length) return;
            const file = input.files[0];

            const archiveDriver = new WebArchiveDriver();

            importDataFromArchive(archiveDriver, file)
                .then((data) => setData(data))
                .catch(error => new Error(error));
        });
    }

    return (
        <Page class={styles.StartPage}>
            <Button
                label={i18next.t(
                    "editor:StartChoice.create",
                    {postProcess: ["capitalize"]}
                )}
                onClick={() => setPage("create")}
            />

            <Button
                label={i18next.t(
                    "editor:StartChoice.continue",
                    {postProcess: ["capitalize"]}
                )}
                onClick={() => handleProjectUpload()}
            />

            <Button
                label={i18next.t(
                    "editor:StartChoice.load",
                    {postProcess: ["capitalize"]}
                )}
                onClick={() => {
                    handleProjectRestore()
                        .catch((error) => {throw new Error(error);});
                }}
            />
        </Page>
    );
}