import styles from "./WorkSpace.module.scss";
import {JSX} from "solid-js";

type Props = {
    children: JSX.Element;
};

export function WorkSpace(props: Props): JSX.Element {
    return (<div class={styles.WorkSpace}>{props.children}</div>);
}