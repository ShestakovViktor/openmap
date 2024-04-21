import {JSX, createSignal} from "solid-js";
import {EditorContext} from "@ui/editor/context";
import {Core, Store} from "@core";
import {IOMode} from "@ui/editor/utility";

type Props = {
    value: {
        core: Core;
        store: Store;
    };
    children: JSX.Element | JSX.Element[];
};

export function EditorProvider(props: Props): JSX.Element {
    const [getIOMode, setIOMode] = createSignal(new IOMode());

    const value = {...props.value, getIOMode, setIOMode};

    return (
        <EditorContext.Provider value={value}>
            {props.children}
        </EditorContext.Provider>
    );
}