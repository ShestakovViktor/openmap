import styles from "./ToolKit.module.scss";
import {JSX} from "solid-js";
import {IDS} from "@enum";
import {Toolbar} from "@shared/widget";

export function ToolKit(): JSX.Element {
    return (
        <Toolbar
            class={styles.ToolKit}
            id={IDS.TOOL_KIT}
            column
        >
        </Toolbar>
    );
}