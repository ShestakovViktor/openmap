import styles from "./InfoPopup.module.scss";
import {JSX, Show, Signal, createEffect, on} from "solid-js";
import {Figure} from "@type";
import {FigureGallery} from "@ui/viewer/widget";

type Props = {
    state: Signal<boolean>;
    text: string;
    figures?: Figure[];
};

export function InfoPopup(props: Props): JSX.Element {
    const [show, setShow] = props.state;
    let ref: HTMLDivElement;

    function hideListener(event: PointerEvent): void {
        if (!ref.contains(event.target as HTMLElement)) {
            setShow(false);
        }
    }

    createEffect(on(show, (value) => {
        if (value) {
            window.addEventListener("pointerdown", hideListener);
        }
        else {
            window.removeEventListener("pointerdown", hideListener);
        }
    }));

    return (
        <Show when={show()}>
            <div class={styles.InfoPopup} ref={ref!}>
                <p class={styles.Text}>{props.text}</p>
                <Show when={props.figures && props.figures.length > 0}>
                    <FigureGallery figures={props.figures!}/>
                </Show>
            </div>
        </Show>
    );
}