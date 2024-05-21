import en from "./string/en.json";

import i18next from "i18next";
import {JSX} from "solid-js";
import {Id} from "@type";
import {
    AssetForm,
    FileField,
    NameField,
} from "@ui/asset/widget";
import {ASSET} from "@enum";

i18next.addResourceBundle("en", "prop", {PropForm: en}, true, true);

type Props = {
    onSubmit?: (AssetId: Id) => void;
    onClose?: () => void;
};

export function FigureForm(props: Props): JSX.Element {
    const data = {typeId: ASSET.FIGURE.id};

    return (
        <AssetForm onSubmit={props.onSubmit} data={data}>
            <NameField/>
            <FileField accept="image/*"/>
        </AssetForm>
    );
}