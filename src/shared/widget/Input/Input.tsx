import {JSX} from "solid-js";
import styles from "./Input.module.scss";

type Props = {
    type?: string;
    name?: string;
    readonly?: boolean;
    value?: string;
    onChange?: (event: Event) => void;
};

export function Input(props: Props): JSX.Element {
    function handleKeyDown(event: KeyboardEvent): void {
        const input = event.target as HTMLInputElement;
        if (event.key === "Enter") {
            input.blur();
            event.preventDefault();
        }
    }

    return (
        <input
            class={styles.Input}
            type={props.type}
            name={props.name}
            value={props.value}
            onKeyDown={handleKeyDown}
            onChange={props.onChange}
            readonly={props.readonly}
        />
    );
}