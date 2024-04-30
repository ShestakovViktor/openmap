import styles from "./SystemSection.module.scss";
import en from "./string/en.json";
import i18next from "i18next";

import {Row, Section} from "@ui/widget";
import {JSX, Resource} from "solid-js";

i18next.addResourceBundle("en", "entity", {SystemSection: en}, true, true);

type Props = {
    entity: Resource<{id: number; typeId: number} | null>;
    expand?: boolean;
};

export function SystemSection({entity, expand}: Props): JSX.Element {
    return (
        <Section
            class={styles.SystemSection}
            name={
                i18next.t(
                    "entity:SystemSection.system",
                    {postProcess: ["capitalize"]}
                )
            }
            expand={expand}
        >
            <Row>
                <label for="id">
                    {i18next.t(
                        "entity:SystemSection.id",
                        {postProcess: ["capitalize"]}
                    )}
                </label>
                <input
                    name="id"
                    type="number"
                    value={entity()?.id ?? ""}
                    readonly
                />
            </Row>
            <Row>
                <label for="typeId">
                    {i18next.t(
                        "entity:SystemSection.typeId",
                        {postProcess: ["capitalize"]}
                    )}
                </label>
                <input
                    name="typeId"
                    type="number"
                    value={entity()?.typeId ?? ""}
                    readonly
                />
            </Row>
        </Section>
    );
}