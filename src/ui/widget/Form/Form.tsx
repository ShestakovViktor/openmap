import {JSX} from "solid-js";
import styles from "./Form.module.scss";

type Props = {
    children?: JSX.Element | JSX.Element[];
    class?: string;
    classList?: JSX.CustomAttributes<HTMLFormElement>;
    onChange?: (event: Event) => void;
    onSubmit?: (event: SubmitEvent) => void;
};
export function Form(props: Props): JSX.Element {
    return (
        <form
            class={styles.Form}
            classList={{[props.class ?? ""]: "class" in props}}
            onChange={props.onChange}
            onSubmit={props.onSubmit}
        >
            {props.children}
        </form>
    );
}