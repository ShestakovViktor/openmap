import styles from "./SystemKit.module.scss";
import FileIconSvg from "@res/svg/file.svg";
import DisketteIconSvg from "@res/svg/diskette.svg";
import DownloadIconSvg from "@res/svg/download.svg";
import SlidersIconSvg from "@res/svg/sliders.svg";
import GearIconSvg from "@res/svg/gear.svg";
import i18next from "i18next";

import {JSX} from "solid-js";
import {Button, Toolbar} from "@shared/widget";
import {useStoreContext} from "@feature/store/context";
import {useEditorContext} from "@feature/editor/context";
import {
    compileProject,
    exportProject,
    saveDataToBrowser,
} from "@feature/editor/service";

export function SystemKit(): JSX.Element {
    const {store} = useStoreContext();
    const {archiveDriver} = useEditorContext();

    return (
        <Toolbar class={styles.SystemKit}>
            <Button
                class={styles.Button}
                icon={DisketteIconSvg}
                tooltip={i18next.t(
                    "layout:SystemBar.exportProject",
                    {postProcess: ["capitalize"]}
                )}
                onClick={() => {
                    saveDataToBrowser(store)
                        .catch(err => err);
                }}
            />

            <Button
                class={styles.Button}
                icon={FileIconSvg}
                tooltip={i18next.t(
                    "layout:SystemBar.exportProject",
                    {postProcess: ["capitalize"]}
                )}
                onClick={() => {
                    exportProject(store, archiveDriver)
                        .catch(err => err);
                }}
            />
            <Button
                class={styles.Button}
                icon={DownloadIconSvg}
                tooltip={i18next.t(
                    "layout:SystemBar.compileProject",
                    {postProcess: ["capitalize"]}
                )}
                onClick={() => {
                    compileProject(store, archiveDriver)
                        .catch(err => err);
                }}
            />
            {/* <Button
                class={styles.Button}
                icon={SlidersIconSvg}
                tooltip={i18next.t(
                    "layout:SystemBar.compileProject",
                    {postProcess: ["capitalize"]}
                )}
                onClick={() => {console.log("qwe");}}
            />
            <Button
                class={styles.Button}
                icon={GearIconSvg}
                tooltip={i18next.t(
                    "layout:SystemBar.compileProject",
                    {postProcess: ["capitalize"]}
                )}
                onClick={() => {console.log("qwe");}}
            /> */}
        </Toolbar>
    );
}