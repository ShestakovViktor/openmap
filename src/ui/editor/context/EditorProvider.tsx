import {JSX} from "solid-js";
import {EditorContexType, EditorContext} from "@ui/editor/context";
import {
    DockArea,
    EntityFocus,
    ToolKit,
    UserInput,
} from "@ui/editor/mode";

type Props = {
    children: JSX.Element | JSX.Element[];
};

export function EditorProvider(props: Props): JSX.Element {
    const userInput = new UserInput();
    const entityFocus = new EntityFocus();
    const dockArea = new DockArea();
    const toolKit = new ToolKit();

    const modes = {} as EditorContexType["modes"];

    const value = {
        userInput,
        entityFocus,
        dockArea,
        toolKit,
        modes,
    };

    return (
        <EditorContext.Provider value={value}>
            {props.children}
        </EditorContext.Provider>
    );
}