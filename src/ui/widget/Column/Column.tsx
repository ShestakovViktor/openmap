import {JSX} from "solid-js";
import styles from "./Column.module.scss";

type Props = {
    children?: JSX.Element | JSX.Element[];
    id?: string;
    class?: string;
};

export function Column(props: Props): JSX.Element {
    return (
        <div class={`${styles.Column} ${props.class ?? ""}`}>
            {props.children}
        </div>
    );
}