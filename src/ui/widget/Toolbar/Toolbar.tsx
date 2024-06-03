import {JSX} from "solid-js";
import styles from "./Toolbar.module.scss";

type Props = {
    id?: string;
    class?: string;
    children?: JSX.Element | JSX.Element[];
    column?: boolean;
};

export function Toolbar(props: Props): JSX.Element {
    return (
        <div
            id={props.id}
            class={styles.Toolbar}
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