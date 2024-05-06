import styles from "./TextSection.module.scss";
import en from "./string/en.json";
import i18next from "i18next";

import {Column, Section} from "@ui/widget";
import {JSX, Resource} from "solid-js";
import {TextField} from "../TextField";

i18next.addResourceBundle("en", "entity", {TextSection: en}, true, true);

type Props = {
    entity: Resource<{text: string} | null>;
};

export function TextSection(props: Props): JSX.Element {
    return (
        <Section
            class={styles.TextSection}
            title={
                i18next.t(
                    "entity:TextSection.title",
                    {postProcess: ["capitalize"]}
                )
            }
        >
            <TextField entity={props.entity}/>
        </Section>
    );
}