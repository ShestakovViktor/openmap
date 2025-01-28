import styles from "./EditToolkit.module.scss";
import en from "./string/en.json";
import DisketteIconSvg from "@res/svg/diskette.svg";
import ArrowLeftIconSvg from "@res/svg/arrow-left.svg";
import ArrowRightIconSvg from "@res/svg/arrow-right.svg";

import {Button, Toolbar} from "@shared/widget";
import {JSX} from "solid-js";
import i18next from "i18next";

import {saveDataToBrowser} from "@feature/editor/service";
import {useStoreContext} from "@feature/store/context";
import {useEditorContext} from "@feature/editor/context";

i18next.addResourceBundle("en", "editor", {EditToolkit: en}, true, true);

export function EditToolkit(): JSX.Element {
    const storeCtx = useStoreContext();
    const editorCtx = useEditorContext();

    return (
        <Toolbar class={styles.SystemToolkit}>
            <Button
                class={styles.Button}
                icon={DisketteIconSvg}
                tooltip={i18next.t(
                    "editor:EditToolkit.save",
                    {postProcess: ["capitalize"]}
                )}
                onClick={() => {
                    saveDataToBrowser(storeCtx.store)
                        .catch(err => err);
                }}
            />
            <Button
                class={styles.Button}
                icon={ArrowLeftIconSvg}
                tooltip={i18next.t(
                    "editor:EditToolkit.undo",
                    {postProcess: ["capitalize"]}
                )}
                onClick={() => editorCtx.invoker.undo()}
            />
            <Button
                class={styles.Button}
                icon={ArrowRightIconSvg}
                tooltip={i18next.t(
                    "editor:EditToolkit.redo",
                    {postProcess: ["capitalize"]}
                )}
                onClick={() => editorCtx.invoker.redo()}
            />
        </Toolbar>
    );
}