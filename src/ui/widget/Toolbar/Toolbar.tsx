import {JSX} from "solid-js";
import styles from "./Toolbar.module.scss";

type Props = {
    children?: JSX.Element | JSX.Element[];
};

export function Toolbar(props: Props): JSX.Element {
    return (<div class={styles.Toolbar}>{props.children}</div>);
}