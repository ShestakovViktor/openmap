import {JSX} from "solid-js";
import {StoreContext} from ".";
import {Data} from "@type";
import {Store} from "@feature/store";

type Props = {
    data: Data;
    children: JSX.Element | JSX.Element[];
};

export function StoreProvider(props: Props): JSX.Element {
    const store = new Store(props.data);

    const value = {store};

    return (
        <StoreContext.Provider value={value}>
            {props.children}
        </StoreContext.Provider>
    );
}