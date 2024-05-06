import styles from "./SystemSection.module.scss";
import en from "./string/en.json";
import i18next from "i18next";

import {Section} from "@ui/widget";
import {JSX, Resource} from "solid-js";
import {IdField, TypeIdField} from "@ui/entity/widget";

i18next.addResourceBundle("en", "entity", {SystemSection: en}, true, true);

type Props = {
    entity: Resource<{id: number; typeId: number} | null>;
};

export function SystemSection(props: Props): JSX.Element {
    return (
        <Section
            class={styles.SystemSection}
            title={
                i18next.t(
                    "entity:SystemSection.title",
                    {postProcess: ["capitalize"]}
                )
            }
        >
            <IdField entity={props.entity}/>
            <TypeIdField entity={props.entity}/>
        </Section>
    );
}