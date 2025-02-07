import styles from "./StartPage.module.scss";
import en from "./string/en.json";

import {Button, Page} from "@shared/widget";

import i18next from "i18next";
import {JSX} from "solid-js";
import {useStartupContext} from "@feature/editor/context";
import {importData} from "@feature/editor/service/data";
import {uploadFile} from "@feature/editor/service/browser/uploadFIle";
import {getBlobFromBrowser} from "@feature/editor/service/browser";

i18next.addResourceBundle("en", "editor", {StartChoice: en}, true, true);

export function StartPage(): JSX.Element {
    const startupCtx = useStartupContext();
    const [,setData] = startupCtx.dataSignal;
    const [,setPage] = startupCtx.pageSignal;

    async function handleProjectRestore(): Promise<void> {
        const file = await getBlobFromBrowser("save.ilto");
        const data = await importData(file, startupCtx.archiveDriver);
        setData(data);
    }

    async function handleProjectUpload(): Promise<void> {
        const file = await uploadFile({type: "file", accept: ".ilto"});
        const data = await importData(file, startupCtx.archiveDriver);
        setData(data);
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
                onClick={() => {void handleProjectUpload();}}
            />

            <Button
                label={i18next.t(
                    "editor:StartChoice.load",
                    {postProcess: ["capitalize"]}
                )}
                onClick={() => {void handleProjectRestore();}}
            />
        </Page>
    );
}