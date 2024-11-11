import en from "./string/en.json";

import i18next from "i18next";
import {Field} from "@shared/widget";
import {JSX} from "solid-js";
import {DATA_TYPE} from "@enum";

i18next.addResourceBundle(
    "en", "asset", {FileField: en}, true, true
);

type Props = {
    accept?: string;
};

export function FileField(props: Props): JSX.Element {
    return (
        <Field>
            <label for="file">
                {i18next.t(
                    "asset:FileField.label",
                    {postProcess: ["capitalize"]}
                )}
            </label>
            <input
                type="file"
                data-type={DATA_TYPE.FILE}
                name="file"
                accept={props.accept}
                required
            />
        </Field>
    );
}