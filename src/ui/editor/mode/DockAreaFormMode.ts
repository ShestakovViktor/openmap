import {Signal} from "solid-js";
import {DockAreaMode} from "./DockAreaMode";
import {Id} from "@type";

export class DockAreaFormMode extends DockAreaMode {
    constructor(
        showSignal: Signal<boolean>,
        private entityId: Signal<Id | null>
    ) {
        super(showSignal);
    }

    set(id: Id | null): void {
        this.entityId[1](id);
    }
}