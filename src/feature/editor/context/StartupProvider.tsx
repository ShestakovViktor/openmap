import {createSignal, JSX, Signal} from "solid-js";
import {StartupContext} from ".";
import {Data} from "@type";

type Props = {
    dataSignal: Signal<Data | undefined>;
    children: JSX.Element | JSX.Element[];
};

export function StartupProvider(props: Props): JSX.Element {
    const pageSignal = createSignal<"start" | "create">("start");

    const value = {
        dataSignal: props.dataSignal,
        pageSignal,
    };

    return (
        <StartupContext.Provider value={value}>
            {props.children}
        </StartupContext.Provider>
    );
}