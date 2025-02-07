import {createSignal, JSX, Signal} from "solid-js";
import {StartupContext} from ".";
import {Data} from "@type";
import {WebArchiveDriver} from "../driver";

type Props = {
    dataSignal: Signal<Data | undefined>;
    children: JSX.Element | JSX.Element[];
};

export function StartupProvider(props: Props): JSX.Element {
    const archiveDriver = new WebArchiveDriver();

    const pageSignal = createSignal<"start" | "create">("start");

    const value = {
        dataSignal: props.dataSignal,
        pageSignal,
        archiveDriver,
    };

    return (
        <StartupContext.Provider value={value}>
            {props.children}
        </StartupContext.Provider>
    );
}