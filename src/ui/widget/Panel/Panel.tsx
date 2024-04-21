import {JSX} from "solid-js";
import styles from "./Panel.module.scss";

type Props = {
    class?: string;
    children?: JSX.Element | JSX.Element[];
};

export function Panel(props: Props): JSX.Element {
    return (
        <div class={`${styles.Panel} ${props.class ?? ""}`}>
            {props.children}
        </div>
    );
}