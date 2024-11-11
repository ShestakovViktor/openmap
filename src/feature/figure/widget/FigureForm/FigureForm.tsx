import en from "./string/en.json";

import i18next from "i18next";
import {JSX} from "solid-js";
import {
    AssetForm,
    FileField,
    NameField,
} from "@feature/asset/widget";
import {ASSET_TYPE} from "@feature/asset/enum";

i18next.addResourceBundle("en", "figure", {FigureForm: en}, true, true);

type Props = {
    onSubmit?: (AssetId: number) => void;
    onClose?: () => void;
};

export function FigureForm(props: Props): JSX.Element {
    const data = {assetTypeId: ASSET_TYPE.FIGURE};

    return (
        <AssetForm onSubmit={props.onSubmit} data={data}>
            <NameField/>
            <FileField accept="image/*"/>
        </AssetForm>
    );
}