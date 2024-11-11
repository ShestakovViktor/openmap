import {Icon} from "@shared/widget";
import styles from "./Button.module.scss";
import {JSX, Show} from "solid-js";

type Props = {
    class?: string;
    pressed?: string;

    label?: string;
    tooltip?: string;
    icon?: string;
    name?: string;

    onClick?: (event?: MouseEvent) => void;
};

export function Button(props: Props): JSX.Element {
    return (
        <button
            classList={{
                [styles.Button]: true,
                [props.class ?? ""]: Boolean(props.class),
                [props.pressed ?? ""]: Boolean(props.pressed),
            }}
            title={props.tooltip}
            onClick={props.onClick}
            name={props.name}
        >
            <Show when={props.icon}>
                <Icon class={styles.Icon} svg={props.icon!}/>
            </Show>

            <Show when={props.label}>
                <label class={styles.Label}>{props.label}</label>
            </Show>
        </button>
    );
}