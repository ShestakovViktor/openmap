import styles from "./ToolBar.module.scss";
import {JSX} from "solid-js";
import {IDS} from "@enum";

export function ToolBar(): JSX.Element {
    return (<div class={styles.ToolBar} id={IDS.TOOLBAR}></div>);
}