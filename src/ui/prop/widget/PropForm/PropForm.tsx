import {JSX} from "solid-js";
import {Id} from "@type";
import {
    AssetForm,
    FileField,
    NameField,
} from "@ui/asset/widget";
import {ASSET} from "@enum";

type Props = {
    onSubmit?: (AssetId: Id) => void;
    onClose?: () => void;
};

export function PropForm(props: Props): JSX.Element {
    const data = {assetTypeId: ASSET.PROP};

    return (
        <AssetForm onSubmit={props.onSubmit} data={data}>
            <NameField/>
            <FileField accept="image/*"/>
        </AssetForm>
    );
}