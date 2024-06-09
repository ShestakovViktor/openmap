import {JSX} from "solid-js";
import styles from "./Icon.module.scss";

type Props = {
    class?: string;
    classList?: {[key: string]: boolean | undefined};
    svg: string;
    onPointerDown?: (event?: PointerEvent) => void;
};

export function Icon(props: Props): JSX.Element {
    return (
        <div
            class={styles.Icon}
            classList={{
                [props.class ?? ""]: Boolean(props.class),
                ...props.classList,
            }}
            innerHTML={props.svg}
            onPointerDown={props.onPointerDown}
        />
    );
}