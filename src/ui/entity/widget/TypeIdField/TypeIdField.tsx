import en from "./string/en.json";
import i18next from "i18next";

import {Field} from "@ui/widget";
import {JSX, Resource} from "solid-js";

i18next.addResourceBundle("en", "entity", {TypeIdField: en}, true, true);

type Props = {
    entity: Resource<{entityTypeId: number} | null>;
};

export function TypeIdField(props: Props): JSX.Element {
    return (
        <Field>
            <label for="entityTypeId">
                {i18next.t(
                    "entity:TypeIdField.label",
                    {postProcess: ["capitalize"]}
                )}
            </label>
            <input
                name="entityTypeId"
                value={props.entity()?.entityTypeId ?? ""}
                data-type="number"
                readonly
            />
        </Field>
    );
}