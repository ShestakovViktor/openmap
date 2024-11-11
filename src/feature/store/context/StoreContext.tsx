import {createContext, useContext} from "solid-js";
import {Store} from "@feature/store";

export type StoreContextType = {
    store: Store;
};

export const StoreContext = createContext<StoreContextType | undefined>();

export function useStoreContext(): StoreContextType {
    const context = useContext(StoreContext);
    if (!context) {
        throw new Error("There is no store context");
    }
    return context;
}
