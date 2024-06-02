import styles from "./SystemKit.module.scss";
import FileIconSvg from "@public/icon/file.svg";
import DisketteIconSvg from "@public/icon/diskette.svg";
import DownloadIconSvg from "@public/icon/download.svg";
import i18next from "i18next";

import {useEditorContext} from "@ui/editor/context";
import {Button, Toolbar} from "@ui/widget";
import {JSX} from "solid-js";

export function SystemKit(): JSX.Element {

    const editorCtx = useEditorContext();

    async function handleProjectSave(): Promise<void> {
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
        await dataFileWritableStream.write(
            JSON.stringify(editorCtx.store.getData())
        );
        await dataFileWritableStream.close();
    }

    async function handleProjectExport(): Promise<void> {
        const projectFile = await editorCtx.core.converter.exportAsFile();

        const projectFileUrl = URL.createObjectURL(projectFile);

        const {value: projectName} = editorCtx.store.config
            .getByParams({name: "name"})[0];
        const tempLink = document.createElement("a");
        tempLink.download = projectName + ".om";
        tempLink.href = projectFileUrl;
        tempLink.click();
        tempLink.remove();
    }

    async function handleProjectCompile(): Promise<void> {
        const websiteArchive = await editorCtx.core.converter
            .exportAsSite();

        const projectFileUrl = URL.createObjectURL(websiteArchive);

        const tempLink = document.createElement("a");
        tempLink.download = "project.zip";
        tempLink.href = projectFileUrl;
        tempLink.click();
        tempLink.remove();
    }

    return (
        <Toolbar class={styles.SystemKit} row>
            <Button
                class={styles.Button}
                icon={DisketteIconSvg}
                tooltip={i18next.t(
                    "layout:SystemBar.exportProject",
                    {postProcess: ["capitalize"]}
                )}
                onClick={() => void handleProjectSave()}
            />

            <Button
                class={styles.Button}
                icon={FileIconSvg}
                tooltip={i18next.t(
                    "layout:SystemBar.exportProject",
                    {postProcess: ["capitalize"]}
                )}
                onClick={() => void handleProjectExport()}
            />
            <Button
                class={styles.Button}
                icon={ DownloadIconSvg }
                tooltip={i18next.t(
                    "layout:SystemBar.compileProject",
                    {postProcess: ["capitalize"]}
                )}
                onClick={() => void handleProjectCompile()}
            />
        </Toolbar>
    );
}