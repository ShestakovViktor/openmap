import {IDS} from "@enum";
import {EntityFormMode} from "@ui/editor/mode";
import {Show, createSignal} from "solid-js";
import {Portal} from "solid-js/web";
import {Id} from "@type";
import {AreaForm} from "@ui/area/widget";

export class AreaFormMode extends EntityFormMode{
    constructor() {
        const showSignal = createSignal(false);
        const updateSignal = createSignal(undefined, {equals: false});
        const entityIdSiganl = createSignal<Id | null>(null);

        super(showSignal, entityIdSiganl, updateSignal);
        const dockarea = document.querySelector("#" + IDS.DOCK_AREA);
        if (!dockarea) throw new Error();

        <Show when={showSignal[0]()}>
            <Portal mount={dockarea}>
                <AreaForm
                    entityId={entityIdSiganl}
                    update={updateSignal}
                />
            </Portal>
        </Show>;
    }
}
