import {createContext, useContext} from "solid-js";

export type NamespaceContextType = {
    namespace: string;
};

export const NamespaceContext
    = createContext<NamespaceContextType | undefined>();

export function useNamespaceContext(): NamespaceContextType {
    const context = useContext(NamespaceContext);

    return context
        ? context
        : {namespace: "Global"};
}

