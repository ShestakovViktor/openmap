import {IDS} from "@enum";
import {ToolKitMode} from "@ui/editor/mode";
import {Show, createSignal} from "solid-js";
import {Portal} from "solid-js/web";
import {MarkerToolKit} from "@ui/marker/widget";

export class MarkerToolKitMode extends ToolKitMode{
    constructor() {
        const showSignal = createSignal(false);

        super(showSignal);

        const toolKit = document.querySelector("#" + IDS.TOOL_KIT);
        if (!toolKit) throw new Error();

        <Show when={showSignal[0]()}>
            <Portal mount={toolKit}>
                <MarkerToolKit/>
            </Portal>
        </Show>;
    }
}
