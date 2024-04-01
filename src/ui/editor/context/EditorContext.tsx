import {createContext, useContext} from "solid-js";
import {Core, Store} from "@core";
import {Mode} from "@ui/editor/utility";

export type EditorContexType = {
    core: Core;
    store: Store;

    mode: () => Mode;
    setMode: (mode: Mode) => void;

};

export const EditorContext = createContext<EditorContexType | undefined>();

export function useEditorContext(): EditorContexType {
    const context = useContext(EditorContext);

    if (!context) {
        throw new Error("There is no editor context");
    }

    return context;
}

