import en from "./string/en.json";
import i18next from "i18next";

import {Section} from "@ui/widget";
import {JSX, Resource} from "solid-js";
import {Id} from "@type";
import {FigureSelect} from "@ui/figure/widget";

i18next.addResourceBundle("en", "entity", {FigureSection: en}, true, true);

type Props = {
    entity: Resource<{figureIds: Id[]} | undefined>;
};

export function FigureSection(props: Props): JSX.Element {
    return (
        <Section
            title={
                i18next.t(
                    "entity:FigureSection.title",
                    {postProcess: ["capitalize"]}
                )
            }
        >
            <FigureSelect entity={props.entity}/>
        </Section>
    );
}