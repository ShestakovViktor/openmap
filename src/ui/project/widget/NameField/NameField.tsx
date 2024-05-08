import en from "./string/en.json";

import i18next from "i18next";
import {Field} from "@ui/widget";
import {JSX} from "solid-js";

i18next.addResourceBundle("en", "project", {NameField: en}, true, true);

export function NameField(): JSX.Element {
    return (
        <Field>
            <label for="name">
                {i18next.t(
                    "project:NameField.label",
                    {postProcess: ["capitalize"]}
                )}
            </label>
            <input
                type="text"
                name="name"
                value="New project"
            />
        </Field>
    );
}