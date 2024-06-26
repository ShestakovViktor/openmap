import en from "./string/en.json";
import i18next from "i18next";
import styles from "./TextField.module.scss";

import {Field} from "@ui/widget";
import {JSX, Resource} from "solid-js";

i18next.addResourceBundle("en", "entity", {TextField: en}, true, true);

type Props = {
    entity: Resource<{text: string} | undefined>;
};

export function TextField(props: Props): JSX.Element {
    return (
        <Field class={styles.TextField} column>
            <label for="text">
                {i18next.t(
                    "entity:TextField.label",
                    {postProcess: ["capitalize"]}
                )}
            </label>
            <textarea
                id="text"
                name="text"
                data-tipe="string"
                value={props.entity()?.text ?? ""}
            />
        </Field>
    );
}