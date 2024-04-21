import {LayerName} from "@enum";
import styles from "./DockArea.module.scss";
import {JSX} from "solid-js";

export function DockArea(): JSX.Element {
    return (<div id={LayerName.DOCKAREA} class={styles.DockArea}></div>);
}