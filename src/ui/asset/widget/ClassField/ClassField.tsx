import en from "./string/en.json";

import i18next from "i18next";
import {Field} from "@ui/widget";
import {JSX} from "solid-js";
import {DATA} from "@enum";

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
                data-type={DATA.STRING}
                required
            />
        </Field>
    );
}