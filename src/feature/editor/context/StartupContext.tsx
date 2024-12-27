import {createContext, Signal, useContext} from "solid-js";
import {Data} from "@type";

export type StartupContexType = {
    dataSignal: Signal<Data | undefined>;
    pageSignal: Signal<"start" | "create">;
};

export const StartupContext = createContext<StartupContexType | undefined>();

export function useStartupContext(): StartupContexType {
    const context = useContext(StartupContext);

    if (!context) {
        throw new Error("There is no startup context");
    }

    return context;
}
