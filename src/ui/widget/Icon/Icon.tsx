import {JSX} from "solid-js";
import styles from "./Icon.module.scss";

type Props = {
    class?: string;
    svg: string;
    onPointerDown?: (event?: PointerEvent) => void;
};

export function Icon(props: Props): JSX.Element {
    const template = document.createElement("template");
    if (props.svg) template.innerHTML = props.svg;

    const icon = template.content.children[0] as SVGElement;
    icon.classList.add(styles.Icon);
    if (props.class) icon.classList.add(props.class);
    if (props.onPointerDown) {
        icon.addEventListener("pointerdown", props.onPointerDown);
    }

    return icon;
}