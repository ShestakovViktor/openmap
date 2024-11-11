import en from "./string/en.json";
import i18next from "i18next";

import {Field} from "@shared/widget";
import {Accessor, JSX} from "solid-js";
import {DATA_TYPE} from "@enum";

i18next.addResourceBundle("en", "entity", {IdField: en}, true, true);

type Props = {
    entity: Accessor<{id: number} | undefined>;
};

export function IdField(props: Props): JSX.Element {
    return (
        <Field>
            <label for="id">
                {i18next.t(
                    "entity:IdField.label",
                    {postProcess: ["capitalize"]}
                )}
            </label>
            <input
                name="id"
                value={props.entity()?.id ?? ""}
                data-type={DATA_TYPE.NUMBER}
                readonly
            />
        </Field>
    );
}