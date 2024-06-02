import {JSX, createSignal} from "solid-js";
import {EditorContexType, EditorContext} from "@ui/editor/context";
import {Core, Store} from "@core";
import {
    DockArea,
    EntityFocus,
    ToolKit,
    UserInput,
} from "@ui/editor/mode";

type Props = {
    value: {
        core: Core;
        store: Store;
    };
    children: JSX.Element | JSX.Element[];
};

export function EditorProvider(props: Props): JSX.Element {
    const [init, reInit] = createSignal(undefined, {equals: false});
    const userInput = new UserInput();
    const entityFocus = new EntityFocus();
    const dockArea = new DockArea();
    const toolKit = new ToolKit();

    const modes = {} as EditorContexType["modes"];

    const value = {
        ...props.value,
        init,
        reInit,
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