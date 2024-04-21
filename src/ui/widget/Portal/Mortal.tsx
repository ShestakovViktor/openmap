import {JSX, Show, Signal} from "solid-js";
import {Portal as SolidPortal} from "solid-js/web";

type Props = {
    destination: string;
    visible: Signal<boolean | undefined>;
    children: JSX.Element;
};

export function Mortal(props: Props): JSX.Element {
    return (
        <Show when={props.visible[0]()}>
            <SolidPortal mount={document.querySelector(props.destination)!}>
                {props.children}
            </SolidPortal>
        </Show>
    );
}