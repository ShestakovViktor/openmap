import {JSX} from "solid-js";
import {
    AssetForm,
    FileField,
    NameField,
} from "@feature/asset/widget";
import {ASSET_TYPE} from "@feature/asset/enum";

type Props = {
    onSubmit?: (AssetId: number) => void;
    onClose?: () => void;
};

export function PropForm(props: Props): JSX.Element {
    const data = {assetTypeId: ASSET_TYPE.PROP};

    return (
        <AssetForm onSubmit={props.onSubmit} data={data}>
            <NameField/>
            <FileField accept="image/*"/>
        </AssetForm>
    );
}