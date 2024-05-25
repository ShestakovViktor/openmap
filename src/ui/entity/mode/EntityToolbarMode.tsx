import {IDS} from "@enum";
import {ToolBarMode} from "@ui/editor/mode";
import {Show, createSignal} from "solid-js";
import {Portal} from "solid-js/web";
import {Id} from "@type";
import {EntityToolbar} from "@ui/entity/widget";

export class EntityToolbarMode extends ToolBarMode{
    constructor() {
        const showSignal = createSignal(false);

        super(showSignal);

        const entityIdSignal = createSignal<Id | null>(null);
        const toolbar = document.querySelector("#" + IDS.TOOLBAR);
        if (!toolbar) throw new Error();

        <Show when={showSignal[0]()}>
            <Portal mount={toolbar}>
                <EntityToolbar
                    entityId={entityIdSignal}
                />
            </Portal>
        </Show>;
    }
}
