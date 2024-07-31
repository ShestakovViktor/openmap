import en from "./string/en.json";

import {JSX} from "solid-js";
import i18next from "i18next";
import {Asset, Id} from "@type";
import {readFile} from "@ui/app/utiliy";
import {DATA} from "@enum";
import {useSignalContext, useStoreContext} from "@ui/app/context";
import {Form} from "@ui/widget";

i18next.addResourceBundle("en", "asset", {AssetForm: en}, true, true);

type Props = {
    children?: JSX.Element | JSX.Element[];
    id?: string;
    class?: string;
    data?: {[key: string]: string | number | File};
    onSubmit?: (assetId: Id) => void;
};

export function AssetForm(props: Props): JSX.Element {
    const {store} = useStoreContext();
    const {signal} = useSignalContext();

    const data: {[key: string]: string | number | File} = props.data ?? {};

    function handleChange(event: Event): void {
        const input = event.target as HTMLInputElement;
        const type = Number(input.getAttribute("data-type"));

        if (type == DATA.NUMBER) {
            data[input.name] = Number(input.value);
        }
        else if (type == DATA.FILE && input.files) {
            data[input.name] = input.files[0];
        }
        else {
            data[input.name] = String(input.value);
        }
    }

    function handleSubmit(event: SubmitEvent): void {
        event.preventDefault();
        if (!data.file) return;

        const {file, ...input} = data;

        readFile(file as File)
            .then((fileData) => {
                Object.assign(input, fileData);
                const asset = store.asset.create(input as Omit<Asset, "id">);
                signal.asset.setUpdateById(asset.id);

                if (props.onSubmit) props.onSubmit(asset.id);
            })
            .catch((err) => {
                throw err;
            });
    }

    return (
        <Form
            classList={{[props.class ?? ""]: "class" in props}}
            onChange={handleChange}
            onSubmit={handleSubmit}
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