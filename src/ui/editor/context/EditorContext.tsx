import {Accessor, Setter, createContext, useContext} from "solid-js";
import {Core, Store} from "@core";
import {IOMode} from "@ui/editor/mode";
import {FormMode, ToolbarMode} from "@ui/editor/mode";
import {Id} from "@type";

export type EditorContexType = {
    core: Core;
    store: Store;

    init: Accessor<undefined>;
    reInit: Setter<undefined>;

    getSelected: Accessor<Id[]>;
    setSelected: Setter<Id[]>;

    getIOMode: Accessor<IOMode>;
    setIOMode: Setter<IOMode>;

    formMode?: FormMode;
    toolbarMode?: ToolbarMode;
};

export const EditorContext = createContext<EditorContexType | undefined>();

export function useEditorContext(): EditorContexType {
    const context = useContext(EditorContext);

    if (!context) {
        throw new Error("There is no editor context");
    }

    return context;
}

