import {Accessor, JSX, Setter, Show, createSignal} from "solid-js";
import {Portal as SolidPortal} from "solid-js/web";

export class Portal {
    private visibility: Accessor<boolean>;

    private setVisibility: Setter<boolean>;

    constructor(
        private destination: string

    ) {
        [this.visibility, this.setVisibility] = createSignal(false);
    }

    show(): void {
        this.setVisibility(true);
    }

    hide(): void {
        this.setVisibility(false);
    }

    render(element: JSX.Element): void {
        <Show when={this.visibility()}>
            <SolidPortal mount={document.querySelector(this.destination)!}>
                {element}
            </SolidPortal>
        </Show>;
    }
}