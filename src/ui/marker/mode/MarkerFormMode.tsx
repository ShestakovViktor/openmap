import {IDS} from "@enum";
import {EntityFormMode} from "@ui/editor/mode";
import {Show, Signal, createSignal} from "solid-js";
import {Portal} from "solid-js/web";
import {MarkerForm, MarkerToolbar} from "@ui/marker/widget";
import {Id} from "@type";

export class MarkerFormMode extends EntityFormMode{
    constructor() {
        const showSignal = createSignal(false);
        const updateSignal = createSignal(undefined, {equals: false});
        const entityIdSiganl = createSignal<Id | null>(null);

        super(showSignal, entityIdSiganl, updateSignal);
        const dockarea = document.querySelector("#" + IDS.DOCK_AREA);
        if (!dockarea) throw new Error();

        <Show when={showSignal[0]()}>
            <Portal mount={dockarea}>
                <MarkerForm
                    entityId={entityIdSiganl}
                    update={updateSignal}
                />
            </Portal>
        </Show>;
    }
}
