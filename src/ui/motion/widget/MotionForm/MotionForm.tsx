import styles from "./MotionForm.module.scss";
import en from "./string/en.json";

import i18next from "i18next";
import {JSX} from "solid-js";
import {Id} from "@type";
import {AssetForm, ClassField, FileField, NameField} from "@ui/asset/widget";
import {useEditorContext} from "@ui/editor/context";
import {AssetType} from "@enum";

i18next.addResourceBundle(
    "en", "motion", {MotionCreateDialog: en}, true, true
);

type Props = {
    onSubmit?: (assetId: Id) => void;
    onClose?: () => void;
};

export function MotionForm(props: Props): JSX.Element {
    const editorCtx = useEditorContext();

    const {id: typeId} = editorCtx.store.type
        .getByParams({name: AssetType.MOTION})[0];

    const data = {typeId};

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