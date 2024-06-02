import styles from "./PositionSection.module.scss";
import en from "./string/en.json";
import i18next from "i18next";

import {Section} from "@ui/widget";
import {JSX, Resource} from "solid-js";
import {XField} from "../XField";
import {YField} from "../YField";

i18next.addResourceBundle("en", "entity", {PositionSection: en}, true, true);

type Props = {
    entity: Resource<{x: number; y: number} | undefined>;
};

export function PositionSection(props: Props): JSX.Element {
    return (
        <Section
            title={
                i18next.t(
                    "entity:PositionSection.title",
                    {postProcess: ["capitalize"]}
                )
            }
            class={styles.PositionSection}
        >
            <XField entity={props.entity}/>
            <YField entity={props.entity}/>
        </Section>
    );
}