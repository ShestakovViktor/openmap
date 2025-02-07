import en from "./string/en.json";

import i18next from "i18next";
import {JSX} from "solid-js";
import {
    FileField,
    NameField,
} from "@feature/asset/widget";
import {ASSET_TYPE} from "@feature/asset/enum";
import {Form} from "@shared/widget";
import {useStoreContext} from "@feature/store/context";
import {Figure} from "@feature/figure/type";
import {AssetForm} from "@feature/asset/widget/AssetForm";

i18next.addResourceBundle("en", "figure", {FigureForm: en}, true, true);

type Props = {
    onSubmit?: (AssetId: number) => void;
    onClose?: () => void;
};

export function FigureForm(props: Props): JSX.Element {
    const storeCtx = useStoreContext();

    function handleSubmit(event: SubmitEvent): void {
        event.preventDefault();
        const form = event.target as HTMLFormElement;

        const formData = new FormData(form);

        const file = formData.get("file") as File;

        const asset = storeCtx.store.asset.add<Figure>({
            assetTypeId: ASSET_TYPE.FIGURE,
            media: file.type,
            name: file.name,
            size: file.size,
            path: URL.createObjectURL(file),
        });

        if (props.onSubmit) props.onSubmit(asset.id);
    }

    return (
        <AssetForm onSubmit={handleSubmit}>
            <NameField/>
            <FileField accept="image/*"/>
        </AssetForm>
    );
}