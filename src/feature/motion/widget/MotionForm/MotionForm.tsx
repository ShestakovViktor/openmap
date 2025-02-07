import en from "./string/en.json";

import i18next from "i18next";
import {JSX} from "solid-js";
import {
    ClassField,
    FileField,
    NameField,
} from "@feature/asset/widget";
import {ASSET_TYPE} from "@feature/asset/enum";
import {Motion} from "@feature/motion/type";
import {useStoreContext} from "@feature/store/context";
import {AssetForm} from "@feature/asset/widget/AssetForm";

i18next.addResourceBundle("en", "motion", {MotionCreateDialog: en}, true, true);

type Props = {
    onSubmit?: (assetId: number) => void;
    onClose?: () => void;
};

export function MotionForm(props: Props): JSX.Element {
    const storeCtx = useStoreContext();

    function handleSubmit(event: SubmitEvent): void {
        event.preventDefault();
        const form = event.target as HTMLFormElement;

        const formData = new FormData(form);

        const file = formData.get("file") as File;
        const cssClass = formData.get("class") as string;

        const asset = storeCtx.store.asset.add<Motion>({
            assetTypeId: ASSET_TYPE.MOTION,
            media: file.type,
            name: file.name,
            size: file.size,
            path: URL.createObjectURL(file),
            class: cssClass,
        });

        if (props.onSubmit) props.onSubmit(asset.id);
    }
    return (
        <AssetForm onSubmit={handleSubmit}>
            <NameField/>
            <ClassField/>
            <FileField accept="text/css"/>
        </AssetForm>
    );
}