import en from "./string/en.json";
import i18next from "i18next";

import {Section} from "@ui/widget";
import {JSX, Resource} from "solid-js";
import {WidthField, HeightField} from "@ui/entity/widget";

i18next.addResourceBundle("en", "entity", {SizeSection: en}, true, true);

type Props = {
    entity: Resource<{width: number; height: number} | undefined>;
};

export function SizeSection(props: Props): JSX.Element {
    return (
        <Section
            title={
                i18next.t(
                    "entity:SizeSection.title",
                    {postProcess: ["capitalize"]}
                )
            }
        >
            <WidthField entity={props.entity}/>
            <HeightField entity={props.entity}/>
        </Section>
    );
}