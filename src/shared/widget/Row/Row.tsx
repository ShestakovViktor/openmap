import {JSX} from "solid-js";
import styles from "./Row.module.scss";

type Props = {
    children?: JSX.Element | JSX.Element[];
    id?: string;
    class?: string;
};

export function Row(props: Props): JSX.Element {
    return (
        <div class={styles.Row}>{props.children}</div>
    );
}