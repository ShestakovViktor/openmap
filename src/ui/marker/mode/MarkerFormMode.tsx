import {IDS} from "@enum";
import {EntityFormMode} from "@ui/editor/mode";
import {Show, createSignal} from "solid-js";
import {Portal} from "solid-js/web";
import {MarkerForm} from "@ui/marker/widget";
import {Id} from "@type";

export class MarkerFormMode extends EntityFormMode{
    constructor() {
        const showSignal = createSignal(false);
        const entityId = createSignal<Id | null>(null);

        super(showSignal, entityId);
        const dockarea = document.querySelector("#" + IDS.DOCK_AREA);
        if (!dockarea) throw new Error();

        <Show when={showSignal[0]()}>
            <Portal mount={dockarea}>
                <MarkerForm entityId={entityId[0]}/>
            </Portal>
        </Show>;
    }
}
