import en from "./string/en.json";

import {JSX} from "solid-js";
import i18next from "i18next";
import {Form} from "@shared/widget";

i18next.addResourceBundle("en", "asset", {AssetForm: en}, true, true);

type Props = {
    children?: JSX.Element | JSX.Element[];
    id?: string;
    class?: string;
    data?: {[key: string]: string | number | File};
    onSubmit: (event: SubmitEvent) => void;
};

export function AssetForm(props: Props): JSX.Element {

    return (
        <Form
            classList={{[props.class ?? ""]: "class" in props}}
            onSubmit={props.onSubmit}
        >
            {props.children}
            <input
                type="submit"
                value={i18next.t(
                    "asset:AssetForm.submit",
                    {postProcess: ["capitalize"]}
                )}
            />
        </Form>
    );
}