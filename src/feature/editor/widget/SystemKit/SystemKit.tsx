import styles from "./SystemKit.module.scss";
import FileIconSvg from "@res/svg/file.svg";
import DisketteIconSvg from "@res/svg/diskette.svg";
import DownloadIconSvg from "@res/svg/download.svg";
import SlidersIconSvg from "@res/svg/sliders.svg";
import GearIconSvg from "@res/svg/gear.svg";
import i18next from "i18next";

import {JSX} from "solid-js";
import {Button, Dialog, Modal, Toolbar} from "@shared/widget";
import en from "./string/en.json";
import {useStoreContext} from "@feature/store/context";
import {useEditorContext} from "@feature/editor/context";
import {
    compileProject,
    exportProject,
    saveDataToBrowser,
} from "@feature/editor/service";
import {ProjectSettings} from "@feature/editor/widget";

i18next.addResourceBundle("en", "editor", {SystemKit: en}, true, true);

export function SystemKit(): JSX.Element {
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
    return (
        <Toolbar class={styles.SystemKit}>
            <Button
                class={styles.Button}
                icon={DisketteIconSvg}
                tooltip={i18next.t(
                    "editor:SystemKit.saveProject",
                    {postProcess: ["capitalize"]}
                )}
                onClick={() => {
                    saveDataToBrowser(storeCtx.store)
                        .catch(err => err);
                }}
            />

            <Button
                class={styles.Button}
                icon={FileIconSvg}
                tooltip={i18next.t(
                    "editor:SystemKit.exportProject",
                    {postProcess: ["capitalize"]}
                )}
                onClick={() => {
                    exportProject(storeCtx.store, archiveDriver)
                        .catch(err => err);
                }}
            />

            <Button
                class={styles.Button}
                icon={DownloadIconSvg}
                tooltip={i18next.t(
                    "editor:SystemKit.compileProject",
                    {postProcess: ["capitalize"]}
                )}
                onClick={() => {
                    compileProject(storeCtx.store, archiveDriver)
                        .catch(err => err);
                }}
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