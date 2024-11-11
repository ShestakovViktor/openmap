import {JSX} from "solid-js";

export type SectionProps = {
    id?: string;
    class?: string;
    children: JSX.Element | JSX.Element[];
    title: string;
};

export function Section(props: SectionProps): JSX.Element {
    return props as unknown as JSX.Element;
}