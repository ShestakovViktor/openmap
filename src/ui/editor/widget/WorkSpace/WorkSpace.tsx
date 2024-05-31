import {IDS} from "@enum";
import styles from "./WorkSpace.module.scss";
import {JSX} from "solid-js";

type Props = {
    children: JSX.Element;
};

export function WorkSpace(props: Props): JSX.Element {
    return (
        <div id={IDS.WORK_SPACE} class={styles.WorkSpace}>
            {props.children}
        </div>
    );
}