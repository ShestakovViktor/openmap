import {JSX, createEffect, createSignal, on} from "solid-js";
import {EditorContext} from "@ui/editor/context";
import {Core, Store} from "@core";
import {IOMode} from "@ui/editor/mode";
import {Id} from "@type";

type Props = {
    value: {
        core: Core;
        store: Store;
    };
    children: JSX.Element | JSX.Element[];
};

export function EditorProvider(props: Props): JSX.Element {
    const [init, reInit] = createSignal(undefined, {equals: false});
    const [getIOMode, setIOMode] = createSignal(new IOMode());
    const [getSelected, setSelected] = createSignal<Id[]>([], {equals: false});

    createEffect(on(getSelected, (curr, prev) => {
        prev?.forEach((id) => {
            if (!curr.includes(id)) {
                const el = document.querySelector(`[data-id="${id}"`);
                if (el) el.classList.remove("Selected");
            }
        });
        curr.forEach((id) => {
            const el = document.querySelector(`[data-id="${id}"`);
            if (el) el.classList.add("Selected");
        });
    }));

    const value = {
        ...props.value,
        init,
        reInit,
        getIOMode,
        setIOMode,
        getSelected,
        setSelected,
    };

    return (
        <EditorContext.Provider value={value}>
            {props.children}
        </EditorContext.Provider>
    );
}