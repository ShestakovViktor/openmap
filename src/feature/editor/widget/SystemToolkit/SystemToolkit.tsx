import styles from "./SystemToolkit.module.scss";
import FileIconSvg from "@res/svg/file.svg";
import DownloadIconSvg from "@res/svg/download.svg";
import SlidersIconSvg from "@res/svg/sliders.svg";
import i18next from "i18next";

import {JSX} from "solid-js";
import {Button, Dialog, Modal, Toolbar} from "@shared/widget";
import en from "./string/en.json";
import {useStoreContext} from "@feature/store/context";
import {useEditorContext} from "@feature/editor/context";
import {archiveData, compileData} from "@feature/editor/service/data";

import {ProjectSettings} from "@feature/editor/widget";
import {Store} from "@feature/store";
import {ArchiveDriver} from "@interface";
import {downloadFile} from "@feature/editor/service/browser";

i18next.addResourceBundle("en", "editor", {SystemKit: en}, true, true);

export function SystemToolkit(): JSX.Element {
    const storeCtx = useStoreContext();
    const {archiveDriver} = useEditorContext();

    const projectSettingsDialog = new Modal();
    projectSettingsDialog.render(
        <Dialog
            class={styles.ProjectSettingsDialog}
            onClose={() => projectSettingsDialog.hide()}
            title={i18next.t(
                "editor:SystemKit.projectSettings",
                {postProcess: ["capitalize"]}
            )}
        >
            <ProjectSettings/>
        </Dialog>
    );

    async function handleExport(): Promise<void> {
        const data = storeCtx.store.extract();
        const archive = await archiveData(archiveDriver, data);
        downloadFile(archive, "test.ilto");
    }

    async function handleCompile(): Promise<void> {
        const data = storeCtx.store.extract();
        const archive = await compileData(archiveDriver, data);
        downloadFile(archive, "test.ilto");
    }

    return (
        <Toolbar class={styles.SystemToolkit}>
            <Button
                class={styles.Button}
                icon={FileIconSvg}
                tooltip={i18next.t(
                    "editor:SystemKit.exportProject",
                    {postProcess: ["capitalize"]}
                )}
                onClick={() => {void handleExport();}}
            />

            <Button
                class={styles.Button}
                icon={DownloadIconSvg}
                tooltip={i18next.t(
                    "editor:SystemKit.compileProject",
                    {postProcess: ["capitalize"]}
                )}
                onClick={() => {void handleCompile();}}
            />

            <Button
                class={styles.Button}
                icon={SlidersIconSvg}
                tooltip={i18next.t(
                    "editor:SystemKit.projectSettings",
                    {postProcess: ["capitalize"]}
                )}
                onClick={() => projectSettingsDialog.show()}
            />

            {/* <Button
                class={styles.Button}
                icon={GearIconSvg}
                tooltip={i18next.t(
                    "editor:SystemBar.editorSettingsDialog",
                    {postProcess: ["capitalize"]}
                )}
                onClick={() => {console.log("qwe");}}
            /> */}
        </Toolbar>
    );
}

