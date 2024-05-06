import en from "./string/en.json";

import i18next from "i18next";
import {Field} from "@ui/widget";
import {JSX} from "solid-js";

i18next.addResourceBundle(
    "en", "asset", {ClassField: en}, true, true
);

export function ClassField(): JSX.Element {
    return (
        <Field>
            <label for="class">
                {i18next.t(
                    "asset:ClassField.label",
                    {postProcess: ["capitalize"]}
                )}
            </label>
            <input
                type="text"
                name="class"
                data-type="string"
                required
            />
        </Field>
    );
}