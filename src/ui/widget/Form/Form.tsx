import {JSX} from "solid-js";
import styles from "./Form.module.scss";

type Props = {
    children?: JSX.Element | JSX.Element[];
    id?: string;
    class?: string;
    onSubmit?: (event: SubmitEvent) => void;
    onChange?: (event: Event) => void;
};

export function Form(props: Props): JSX.Element {
    return (
        <form
            class={`${styles.Form} ${props.class ?? ""}`}
            onSubmit={props.onSubmit}
            onChange={props.onChange}
        >
            {props.children}
        </form>
    );
}