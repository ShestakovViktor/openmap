import {IDS} from "@enum";
import {ToolKitMode} from "@ui/editor/mode";
import {Show, createSignal} from "solid-js";
import {Portal} from "solid-js/web";
import {EntityToolKit} from "@ui/entity/widget";

export class EntityToolKitMode extends ToolKitMode{
    constructor() {
        const showSignal = createSignal(false);

        super(showSignal);

        const toolKit = document.querySelector("#" + IDS.TOOL_KIT);
        if (!toolKit) throw new Error();

        <Show when={showSignal[0]()}>
            <Portal mount={toolKit}>
                <EntityToolKit />
            </Portal>
        </Show>;
    }
}
