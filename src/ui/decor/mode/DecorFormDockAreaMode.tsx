import {IDS} from "@enum";
import {DockAreaFormMode} from "@ui/editor/mode";
import {Show, createSignal} from "solid-js";
import {Portal} from "solid-js/web";
import {Id} from "@type";
import {DecorForm} from "../widget";

export class DecorFormDockAreaMode extends DockAreaFormMode{
    constructor() {
        const showForm = createSignal(false);
        const entityId = createSignal<Id | null>(null);

        super(showForm, entityId);
        const dockarea = document.querySelector("#" + IDS.DOCK_AREA);
        if (!dockarea) throw new Error();

        <Show when={showForm[0]()}>
            <Portal mount={dockarea}>
                <DecorForm entityId={entityId[0]}/>
            </Portal>
        </Show>;
    }
}
