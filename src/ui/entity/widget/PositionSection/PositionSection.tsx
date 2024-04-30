import styles from "./PositionSection.module.scss";
import en from "./string/en.json";
import i18next from "i18next";

import {Row, Section} from "@ui/widget";
import {JSX, Resource} from "solid-js";

i18next.addResourceBundle("en", "entity", {PositionSection: en}, true, true);

type Props = {
    entity: Resource<{x: number; y: number} | null>;
    expand?: boolean;
};

export function PositionSection({entity, expand}: Props): JSX.Element {
    return (
        <Section
            name={
                i18next.t(
                    "entity:PositionSection.position",
                    {postProcess: ["capitalize"]}
                )
            }
            class={styles.PositionSection}
            expand={expand}
        >
            <Row>
                <label for="x">
                    {i18next.t(
                        "entity:PositionSection.x",
                        {postProcess: ["capitalize"]}
                    )}
                </label>
                <input type="number" name="x" value={entity()?.x ?? ""}/>
            </Row>
            <Row>
                <label for="y">
                    {i18next.t(
                        "entity:PositionSection.y",
                        {postProcess: ["capitalize"]}
                    )}
                </label>
                <input type="number" name="y" value={entity()?.y ?? ""}/>
            </Row>
        </Section>
    );
}