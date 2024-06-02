import {IDS} from "@enum";
import {DockAreaFormMode} from "@ui/editor/mode";
import {Show, createSignal} from "solid-js";
import {Portal} from "solid-js/web";
import {MarkerForm} from "@ui/marker/widget";
import {Id} from "@type";

export class MarkerFormDockAreaMode extends DockAreaFormMode{
    constructor() {
        const showForm = createSignal(false);
        const entityId = createSignal<Id | null>(null);

        super(showForm, entityId);

        const dockarea = document.querySelector("#" + IDS.DOCK_AREA);
        if (!dockarea) throw new Error();

        <Show when={showForm[0]()}>
            <Portal mount={dockarea}>
                <MarkerForm entityId={entityId[0]} />
            </Portal>
        </Show>;
    }
}
