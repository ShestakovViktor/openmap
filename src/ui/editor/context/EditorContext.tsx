import {Accessor, Setter, createContext, useContext} from "solid-js";
import {Core, Store} from "@core";
import {InputMode, FocusMode, FormMode, ToolbarMode} from "@ui/editor/mode";

export type EditorContexType = {
    core: Core;
    store: Store;

    inputMode?: InputMode;
    formMode?: FormMode;
    toolbarMode?: ToolbarMode;
    focusMode?: FocusMode;

    init: Accessor<undefined>;
    reInit: Setter<undefined>;
};

export const EditorContext = createContext<EditorContexType | undefined>();

export function useEditorContext(): EditorContexType {
    const context = useContext(EditorContext);

    if (!context) {
        throw new Error("There is no editor context");
    }

    return context;
}

