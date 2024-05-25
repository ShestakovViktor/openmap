import {Accessor, Setter, createContext, useContext} from "solid-js";
import {Core, Store} from "@core";
import {
    UserInputMode,
    ToolBarMode,
    EntityFormMode,
    DockArea,
    ToolBar,
    UserInput,
    EntityFocus,
} from "@ui/editor/mode";

export type EditorContexType = {
    core: Core;
    store: Store;

    init: Accessor<undefined>;
    reInit: Setter<undefined>;

    userInput: UserInput;
    entityFocus: EntityFocus;
    dockArea: DockArea;
    toolBar: ToolBar;

    modes: {
        entity: {
            input: UserInputMode;
            toolbar: ToolBarMode;
        };
        marker: {
            input: UserInputMode;
            form: EntityFormMode;
            toolbar: ToolBarMode;
        };
        decor: {
            input: UserInputMode;
            form: EntityFormMode;
        };
        area: {
            input: UserInputMode;
            form: EntityFormMode;
        };
    };

};

export const EditorContext = createContext<EditorContexType | undefined>();

export function useEditorContext(): EditorContexType {
    const context = useContext(EditorContext);

    if (!context) {
        throw new Error("There is no editor context");
    }

    return context;
}

