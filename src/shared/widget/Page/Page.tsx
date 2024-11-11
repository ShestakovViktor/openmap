import {JSX} from "solid-js";
import styles from "./Page.module.scss";

type Props = {
    children?: JSX.Element | JSX.Element[];
    class?: string;
};

export function Page(props: Props): JSX.Element {
    return (
        <div
            class={styles.Page}
            classList={{
                [props.class ?? ""]: Boolean(props.class),
            }}
        >
            {props.children}
        </div>
    );
}