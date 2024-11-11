import styles from "./MotionForm.module.scss";
import en from "./string/en.json";

import i18next from "i18next";
import {JSX} from "solid-js";
import {
    AssetForm,
    ClassField,
    FileField,
    NameField,
} from "@feature/asset/widget";
import {ASSET_TYPE} from "@feature/asset/enum";

i18next.addResourceBundle("en", "motion", {MotionCreateDialog: en}, true, true);

type Props = {
    onSubmit?: (assetId: number) => void;
    onClose?: () => void;
};

export function MotionForm(props: Props): JSX.Element {
    const data = {assetTypeId: ASSET_TYPE.MOTION};

    return (
        <AssetForm
            class={styles.MotionForm}
            onSubmit={props.onSubmit}
            data={data}
        >
            <NameField/>
            <ClassField/>
            <FileField accept="text/css"/>
        </AssetForm>
    );
}