import en from "./string/en.json";

import i18next from "i18next";
import {Field} from "@shared/widget";
import {JSX} from "solid-js";
import {DATA_TYPE} from "@enum";

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
                data-type={DATA_TYPE.STRING}
                required
            />
        </Field>
    );
}