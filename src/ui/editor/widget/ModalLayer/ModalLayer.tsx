import styles from "./ModalLayer.module.scss";
import {JSX} from "solid-js";
import {IDS} from "@enum";

export function ModalLayer(): JSX.Element {
    return (
        <div
            id={IDS.MODAL_LAYER}
            class={styles.ModalLayer}
        >
        </div>
    );
}