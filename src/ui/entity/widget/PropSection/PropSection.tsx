import en from "./string/en.json";
import i18next from "i18next";

import {Section} from "@ui/widget";
import {JSX, Resource} from "solid-js";
import {Id} from "@type";
import {PropSelect} from "@ui/prop/widget";

i18next.addResourceBundle("en", "entity", {PropSection: en}, true, true);

type Props = {
    entity: Resource<{propId: Id | null} | undefined>;
};

export function PropSection(props: Props): JSX.Element {
    return (
        <Section
            title={
                i18next.t(
                    "entity:PropSection.title",
                    {postProcess: ["capitalize"]}
                )
            }
        >
            <PropSelect entity={props.entity}/>
        </Section>
    );
}