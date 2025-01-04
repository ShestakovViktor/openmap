import en from "./string/en.json";
import i18next from "i18next";

import {Field, Input} from "@shared/widget";
import {Accessor, JSX} from "solid-js";

i18next.addResourceBundle("en", "entity", {EntityTypeIdField: en}, true, true);

type Props = {
    entity: Accessor<{entityTypeId: number} | undefined>;
};

export function EntityTypeIdField(props: Props): JSX.Element {
    return (
        <Field>
            <label for="entityTypeId">
                {i18next.t(
                    "entity:EntityTypeIdField.label",
                    {postProcess: ["capitalize"]}
                )}
            </label>
            <Input
                name="entityTypeId"
                value={String(props.entity()?.entityTypeId)}
                readonly
            />
        </Field>
    );
}