import {JSX, createSignal} from "solid-js";
import {StoreContext} from "@ui/app/context";
import {Store} from "@core";
import {Id} from "@type";

type Props = {
    store: Store;
    children: JSX.Element | JSX.Element[];
};

export function StoreProvider(props: Props): JSX.Element {
    const storeInit
        = createSignal<undefined>(undefined, {equals: false});

    const updateEntity
        = createSignal<Id | undefined>(undefined, {equals: false});

    const updateAsset
        = createSignal<Id | undefined>(undefined, {equals: false});

    const value = {
        initializing: storeInit[0],
        initialize: storeInit[1],

        store: props.store,

        update: {
            entity: {
                get: updateEntity[0],
                set: updateEntity[1],
            },
            asset: {
                get: updateAsset[0],
                set: updateAsset[1],
            },
        },
    };

    return (
        <StoreContext.Provider value={value}>
            {props.children}
        </StoreContext.Provider>
    );
}