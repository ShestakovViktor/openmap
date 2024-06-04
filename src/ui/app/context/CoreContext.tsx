import {createContext, useContext} from "solid-js";
import {Core} from "@core";

export type CoreContextType = {
    core: Core;
};

export const CoreContext = createContext<CoreContextType | undefined>();

export function useCoreContext(): CoreContextType {
    const context = useContext(CoreContext);
    if (!context) {
        throw new Error("There is no store context");
    }
    return context;
}
