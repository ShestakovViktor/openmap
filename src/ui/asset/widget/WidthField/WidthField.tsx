import en from "./string/en.json";

import i18next from "i18next";
import {Field} from "@ui/widget";
import {JSX} from "solid-js";

i18next.addResourceBundle(
    "en", "asset", {WidthField: en}, true, true
);

export function WidthField(): JSX.Element {
    return (
        <Field>
            <label for="width">
                {i18next.t(
                    "asset:WidthField.label",
                    {postProcess: ["capitalize"]}
                )}
            </label>
            <input
                type="number"
                data-type="number"
                name="width"
                required
            />
        </Field>
    );
}