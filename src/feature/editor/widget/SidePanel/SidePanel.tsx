import {IDS} from "@enum";
import styles from "./SidePanel.module.scss";
import {JSX} from "solid-js";

type Props = {
    children: JSX.Element;
};

export function SidePanel(props: Props): JSX.Element {
    return (
        <div id={IDS.SIDE_PANEL} class={styles.SidePanel}>
            {props.children}
        </div>
    );
}