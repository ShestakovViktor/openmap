import en from "./string/en.json";

import i18next from "i18next";
import {Field} from "@ui/widget";
import {JSX} from "solid-js";

i18next.addResourceBundle("en", "project", {MapField: en}, true, true);

export function MapField(): JSX.Element {
    return (
        <Field>
            <label for="map">
                {i18next.t(
                    "project:MapField.label",
                    {postProcess: ["capitalize"]}
                )}
            </label>
            <input
                type="file"
                name="map"
                accept="image/*"
            />
        </Field>
    );
}