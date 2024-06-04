import {JSX} from "solid-js";
import {CoreContext} from "@ui/app/context";
import {Core} from "@core";

type Props = {
    core: Core;
    children: JSX.Element | JSX.Element[];
};

export function CoreProvider(props: Props): JSX.Element {
    const value = {
        core: props.core,
    };

    return (
        <CoreContext.Provider value={value}>
            {props.children}
        </CoreContext.Provider>
    );
}