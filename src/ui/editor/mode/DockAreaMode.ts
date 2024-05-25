import {Signal} from "solid-js";

export class DockAreaMode {
    constructor(
        private showSignal: Signal<boolean>
    ) { }

    show(): void {
        this.showSignal[1](true);
    }

    hide(): void {
        this.showSignal[1](false);
    }
}