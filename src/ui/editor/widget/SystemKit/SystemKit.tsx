import styles from "./SystemKit.module.scss";
import FileIconSvg from "@res/svg/file.svg";
import DisketteIconSvg from "@res/svg/diskette.svg";
import DownloadIconSvg from "@res/svg/download.svg";
import i18next from "i18next";

import {Button, Toolbar} from "@ui/widget";
import {JSX} from "solid-js";
import {useCoreContext, useStoreContext} from "@ui/app/context";

export function SystemKit(): JSX.Element {
    const {store} = useStoreContext();
    const coreCtx = useCoreContext();

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
            JSON.stringify(store.getData())
        );
        await dataFileWritableStream.close();
    }

    async function handleProjectExport(): Promise<void> {
        const data = store.getData();
        const projectFile = await coreCtx.core.converter.exportAsFile(data);

        const projectFileUrl = URL.createObjectURL(projectFile);

        const {value: projectName} = store.config
            .getByParams({name: "name"})[0];
        const tempLink = document.createElement("a");
        tempLink.download = projectName + ".om";
        tempLink.href = projectFileUrl;
        tempLink.click();
        tempLink.remove();
    }

    async function handleProjectCompile(): Promise<void> {
        const data = store.getData();
        const {value: name} = store.config
            .getByParams({name: "name"})[0];

        const websiteArchive = await coreCtx.core.converter
            .exportAsSite(data, {name: String(name)});

        const projectFileUrl = URL.createObjectURL(websiteArchive);

        const tempLink = document.createElement("a");
        tempLink.download = "project.zip";
        tempLink.href = projectFileUrl;
        tempLink.click();
        tempLink.remove();
    }

    return (
        <Toolbar class={styles.SystemKit}>
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