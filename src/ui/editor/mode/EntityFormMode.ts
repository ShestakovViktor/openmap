import {Signal} from "solid-js";
import {DockAreaMode} from "./DockAreaMode";
import {Id} from "@type";

export class EntityFormMode extends DockAreaMode {
    constructor(
        showSignal: Signal<boolean>,
        private entityId: Signal<Id | null>,
        private updateSignal: Signal<undefined>
    ) {
        super(showSignal);
    }

    set(id: Id | null): void {
        this.entityId[1](id);
    }
}