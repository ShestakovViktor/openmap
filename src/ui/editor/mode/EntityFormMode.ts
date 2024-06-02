import {Signal} from "solid-js";
import {DockAreaMode} from "./DockAreaMode";
import {Id} from "@type";

export class EntityFormMode extends DockAreaMode {
    constructor(
        showForm: Signal<boolean>,
        private entityId: Signal<Id | null>
    ) {
        super(showForm);
    }

    set(id: Id | null): void {
        this.entityId[1](id);
    }
}