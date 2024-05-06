import {JSX} from "solid-js";
import styles from "./Field.module.scss";

type Props = {
    children?: JSX.Element | JSX.Element[];
    type?: "row" | "column";
    id?: string;
    class?: string;
};

export function Field(props: Props): JSX.Element {
    return (
        <div
            class={styles.Field}
            classList={{
                [styles[props.type ?? "row"]]: true,
            }}
        >
            {props.children}
        </div>
    );
}