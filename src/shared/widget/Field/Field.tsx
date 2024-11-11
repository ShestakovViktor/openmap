import {JSX} from "solid-js";
import styles from "./Field.module.scss";

type Props = {
    id?: string;
    class?: string;
    column?: boolean;
    children?: JSX.Element | JSX.Element[];
};

export function Field(props: Props): JSX.Element {
    return (
        <div
            class={styles.Field}
            classList={{
                [props.class ?? ""]: Boolean(props.class),
                ...props.column
                    ? {[styles.Column]: true}
                    : {[styles.Row]: true},
            }}
        >
            {props.children}
        </div>
    );
}