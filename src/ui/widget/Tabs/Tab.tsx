import {JSX} from "solid-js";

export type TabProps = {
    children: JSX.Element | JSX.Element[];
    name: string;
    class?: string;
};

export function Tab(props: TabProps): JSX.Element {
    return props as unknown as JSX.Element;
}