import en from "./string/en.json";

import i18next from "i18next";
import {Field} from "@ui/widget";
import {JSX} from "solid-js";
import {DATA} from "@enum";

i18next.addResourceBundle(
    "en", "asset", {NameField: en}, true, true
);

export function NameField(): JSX.Element {
    return (
        <Field>
            <label for="name">
                {i18next.t(
                    "asset:NameField.label",
                    {postProcess: ["capitalize"]}
                )}
            </label>
            <input
                type="text"
                name="name"
                data-type={DATA.STRING}
                required
            />
        </Field>
    );
}