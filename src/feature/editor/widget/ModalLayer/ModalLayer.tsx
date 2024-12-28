import styles from "./ModalLayer.module.scss";
import {JSX} from "solid-js";
import {IDS} from "@enum";

type Props = {
    children?: JSX.Element;
};

export function ModalLayer(props: Props): JSX.Element {
    return (
        <div id={IDS.MODAL_LAYER} class={styles.ModalLayer}>
            <div>
                {props.children}
            </div>
        </div>
    );
}