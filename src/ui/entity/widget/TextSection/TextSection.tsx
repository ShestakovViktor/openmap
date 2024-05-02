import styles from "./TextSection.module.scss";
import en from "./string/en.json";
import i18next from "i18next";

import {Column, Section} from "@ui/widget";
import {JSX, Resource, Signal} from "solid-js";

i18next.addResourceBundle("en", "entity", {TextSection: en}, true, true);

type Props = {
    entity: Resource<{text: string} | null>;
    expand?: Signal<boolean>;
};

export function TextSection(props: Props): JSX.Element {
    return (
        <Section
            class={styles.TextSection}
            title={
                i18next.t(
                    "entity:TextSection.text",
                    {postProcess: ["capitalize"]}
                )
            }
        >
            <Column>
                <textarea
                    id="text"
                    name="text"
                    value={props.entity()?.text ?? ""}
                />
            </Column>
        </Section>
    );
}