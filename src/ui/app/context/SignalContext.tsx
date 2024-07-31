import {Id} from "@type";
import {Accessor, Setter, createContext, useContext} from "solid-js";

export type SignalContextType = {
    signal: {
        store: {
            getInit: Accessor<undefined>;
            setInit: Setter<undefined>;
        };
        entity: {
            getUpdateById: Accessor<Id | undefined>;
            setUpdateById: Setter<Id | undefined>;
        };
        asset: {
            getUpdateById: Accessor<Id | undefined>;
            setUpdateById: Setter<Id | undefined>;
        };
    };
};

export const SignalContext = createContext<SignalContextType | undefined>();

export function useSignalContext(): SignalContextType {
    const context = useContext(SignalContext);
    if (!context) {
        throw new Error("There is no store context");
    }
    return context;
}
