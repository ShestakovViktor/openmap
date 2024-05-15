import en from "./string/en.json";
import i18next from "i18next";

import {Field} from "@ui/widget";
import {JSX, Resource} from "solid-js";

i18next.addResourceBundle("en", "entity", {HeightField: en}, true, true);

type Props = {
    entity: Resource<{height: number} | null>;
};

export function HeightField(props: Props): JSX.Element {
    return (
        <Field>
            <label for="height">
                {i18next.t(
                    "entity:HeightField.label",
                    {postProcess: ["capitalize"]}
                )}
            </label>
            <input
                type="number"
                name="height"
                value={props.entity()?.height ?? ""}
                data-type="number"
            />
        </Field>
    );
}