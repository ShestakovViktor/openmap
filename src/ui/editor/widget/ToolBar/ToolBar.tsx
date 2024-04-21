import {LayerName} from "@enum";
import styles from "./ToolBar.module.scss";
import {JSX} from "solid-js";

export function ToolBar(): JSX.Element {
    return (<div class={styles.ToolBar} id={LayerName.TOOLBAR}></div>);
}