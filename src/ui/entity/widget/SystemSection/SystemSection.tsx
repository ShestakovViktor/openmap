import styles from "./SystemSection.module.scss";
import en from "./string/en.json";
import i18next from "i18next";

import {Field, Row, Section} from "@ui/widget";
import {JSX, Resource} from "solid-js";

i18next.addResourceBundle("en", "entity", {SystemSection: en}, true, true);

type Props = {
    id?: string;
    entity: Resource<{id: number; typeId: number} | null>;
};

export function SystemSection(props: Props): JSX.Element {
    return (
        <Section
            id={props.id}
            class={styles.SystemSection}
            title={
                i18next.t(
                    "entity:SystemSection.system",
                    {postProcess: ["capitalize"]}
                )
            }
        >
            <Field>
                <label for="id">
                    {i18next.t(
                        "entity:SystemSection.id",
                        {postProcess: ["capitalize"]}
                    )}
                </label>
                <input
                    name="id"
                    type="number"
                    value={props.entity()?.id ?? ""}
                    readonly
                />
            </Field>
            <Field>
                <label for="typeId">
                    {i18next.t(
                        "entity:SystemSection.typeId",
                        {postProcess: ["capitalize"]}
                    )}
                </label>
                <input
                    name="typeId"
                    type="number"
                    value={props.entity()?.typeId ?? ""}
                    readonly
                />
            </Field>
        </Section>
    );
}