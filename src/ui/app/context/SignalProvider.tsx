import {JSX, createSignal} from "solid-js";
import {SignalContext} from "@ui/app/context";
import {Id} from "@type";

type Props = {
    children: JSX.Element | JSX.Element[];
};

export function SignalProvider(props: Props): JSX.Element {
    const storeInit
        = createSignal<undefined>(undefined, {equals: false});

    const entityUpdate
        = createSignal<Id | undefined>(undefined, {equals: false});

    const assetUpdate
        = createSignal<Id | undefined>(undefined, {equals: false});

    const value = {
        signal: {
            store: {
                getInit: storeInit[0],
                setInit: storeInit[1],
            },
            entity: {
                getUpdateById: entityUpdate[0],
                setUpdateById: entityUpdate[1],
            },
            asset: {
                getUpdateById: assetUpdate[0],
                setUpdateById: assetUpdate[1],
            },
        },
    };

    return (
        <SignalContext.Provider value={value}>
            {props.children}
        </SignalContext.Provider>
    );
}