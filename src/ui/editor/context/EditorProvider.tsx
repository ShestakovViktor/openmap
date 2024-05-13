import {JSX, createSignal} from "solid-js";
import {EditorContext} from "@ui/editor/context";
import {Core, Store} from "@core";

type Props = {
    value: {
        core: Core;
        store: Store;
    };
    children: JSX.Element | JSX.Element[];
};

export function EditorProvider(props: Props): JSX.Element {
    const [init, reInit] = createSignal(undefined, {equals: false});

    const value = {
        ...props.value,
        init,
        reInit,
    };

    return (
        <EditorContext.Provider value={value}>
            {props.children}
        </EditorContext.Provider>
    );
}