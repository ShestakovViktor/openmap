import styles from "./CommandKit.module.scss";

import {JSX} from "solid-js";
import {SystemToolkit, InputToolkit, EditToolkit} from "@feature/editor/widget";
import {IDS} from "@enum";

export function CommandKit(): JSX.Element {
    return (
        <div
            id={IDS.COMMAND_KIT}
            class={styles.CommandKit}
        >
            <SystemToolkit/>
            <EditToolkit/>
            <InputToolkit/>
        </div>
    );
}