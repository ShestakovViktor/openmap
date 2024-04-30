import {JSX} from "solid-js";

export type SectionProps = {
    children: JSX.Element | JSX.Element[];
    name: string;
    class?: string;
    expand?: boolean;
};

export function Section(props: SectionProps): JSX.Element {
    return props as unknown as JSX.Element;
}