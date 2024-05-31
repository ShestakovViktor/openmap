import {IDS} from "@enum";
import {ToolBarMode} from "@ui/editor/mode";
import {Show, createSignal} from "solid-js";
import {Portal} from "solid-js/web";
import {MarkerToolbar} from "@ui/marker/widget";
import {Id} from "@type";

export class MarkerToolbarMode extends ToolBarMode{
    constructor() {
        const showSignal = createSignal(false);

        super(showSignal);

        const toolbar = document.querySelector("#" + IDS.TOOLBAR);
        if (!toolbar) throw new Error();

        <Show when={showSignal[0]()}>
            <Portal mount={toolbar}>
                <MarkerToolbar/>
            </Portal>
        </Show>;
    }
}
