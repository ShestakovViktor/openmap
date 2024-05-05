import {JSX} from "solid-js";
import styles from "./Field.module.scss";

type Props = {
    children?: JSX.Element | JSX.Element[];
    id?: string;
    class?: string;
};

export function Field(props: Props): JSX.Element {
    return (<div class={styles.Field}>{props.children}</div>);
}