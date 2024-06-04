import {Accessor, Setter, createContext, useContext} from "solid-js";
import {Store} from "@core";
import {Id} from "@type";

export type StoreContextType = {
    initializing: Accessor<undefined>;
    initialize: Setter<undefined>;

    store: Store;

    update: {
        entity: {
            get: Accessor<Id | undefined>;
            set: Setter<Id | undefined>;
        };
        asset: {
            get: Accessor<Id | undefined>;
            set: Setter<Id | undefined>;
        };
    };
};

export const StoreContext = createContext<StoreContextType | undefined>();

export function useStoreContext(): StoreContextType {
    const context = useContext(StoreContext);
    if (!context) {
        throw new Error("There is no store context");
    }
    return context;
}
