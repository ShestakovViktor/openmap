import styles from "./Modal.module.scss";
import {MODAL_ID} from "@ui/editor/widget";
import {Accessor, JSX, Setter, Show, createSignal} from "solid-js";
import {Portal} from "solid-js/web";

export class Modal {
    private visibility: Accessor<boolean>;

    private setVisibility: Setter<boolean>;

    constructor(
        private params?: {background: boolean}
    ) {
        const [visibility, setVisibility] = createSignal(false);
        this.visibility = visibility;
        this.setVisibility = setVisibility;
    }

    show(): void {
        this.setVisibility(true);
    }

    hide(): void {
        this.setVisibility(false);
    }

    render(element: JSX.Element): void {
        <Show when={this.visibility()}>
            <Portal mount={document.querySelector("#" + MODAL_ID)!}>
                <Show when={this.params?.background}>
                    <div class={styles.Background}></div>
                </Show>
                {element}
            </Portal>
        </Show>;
    }
}