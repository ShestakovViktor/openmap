import {INPUT_MODE, UI_MODE} from "@feature/editor/enum";

export type EditorState = {
    dockArea: {
        items: typeof UI_MODE[keyof typeof UI_MODE][];
    };

    inputMode: typeof INPUT_MODE[keyof typeof INPUT_MODE];
};