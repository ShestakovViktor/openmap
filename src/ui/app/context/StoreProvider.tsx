import {JSX} from "solid-js";
import {StoreContext} from "@ui/app/context";
import {Store} from "@core";

type Props = {
    store: Store;
    children: JSX.Element | JSX.Element[];
};

export function StoreProvider(props: Props): JSX.Element {
    const value = {
        store: props.store,
    };

    return (
        <StoreContext.Provider value={value}>
            {props.children}
        </StoreContext.Provider>
    );
}