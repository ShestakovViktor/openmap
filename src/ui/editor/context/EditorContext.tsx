import {createContext, useContext} from "solid-js";
import {
    UserInputMode,
    ToolKitMode,
    DockAreaFormMode,
    DockArea,
    ToolKit,
    UserInput,
    EntityFocus,
} from "@ui/editor/mode";

export type EditorContexType = {
    userInput: UserInput;
    entityFocus: EntityFocus;
    dockArea: DockArea;
    toolKit: ToolKit;

    modes: {
        entity: {
            input: UserInputMode;
            toolKit: ToolKitMode;
        };
        marker: {
            input: UserInputMode;
            form: DockAreaFormMode;
            toolKit: ToolKitMode;
        };
        decor: {
            input: UserInputMode;
            form: DockAreaFormMode;
        };
        area: {
            input: UserInputMode;
            form: DockAreaFormMode;
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

