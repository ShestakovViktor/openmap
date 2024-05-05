import styles from "./PositionSection.module.scss";
import en from "./string/en.json";
import i18next from "i18next";

import {Field, Section} from "@ui/widget";
import {JSX, Resource} from "solid-js";

i18next.addResourceBundle("en", "entity", {PositionSection: en}, true, true);

type Props = {
    id?: string;
    entity: Resource<{x: number; y: number} | null>;
};

export function PositionSection(props: Props): JSX.Element {
    return (
        <Section
            title={
                i18next.t(
                    "entity:PositionSection.position",
                    {postProcess: ["capitalize"]}
                )
            }
            class={styles.PositionSection}
        >
            <Field>
                <label for="x">
                    {i18next.t(
                        "entity:PositionSection.x",
                        {postProcess: ["capitalize"]}
                    )}
                </label>
                <input type="number" name="x" value={props.entity()?.x ?? ""}/>
            </Field>
            <Field>
                <label for="y">
                    {i18next.t(
                        "entity:PositionSection.y",
                        {postProcess: ["capitalize"]}
                    )}
                </label>
                <input type="number" name="y" value={props.entity()?.y ?? ""}/>
            </Field>
        </Section>
    );
}