import en from "./string/en.json";
import i18next from "i18next";

import {Section} from "@shared/widget";
import {Accessor, JSX} from "solid-js";
import {WidthField, HeightField} from "@feature/entity/widget";
import {Entity, Size} from "@feature/entity/type";

i18next.addResourceBundle("en", "entity", {SizeSection: en}, true, true);

type Props = {
    entity: Accessor<Entity & Size>;
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