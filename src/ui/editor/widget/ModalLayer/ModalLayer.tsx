import styles from "./ModalLayer.module.scss";
import {JSX} from "solid-js";

export const MODAL_ID = "modal";

export function ModalLayer(): JSX.Element {
    return (<div id={MODAL_ID} class={styles.ModalLayer}></div>);
}