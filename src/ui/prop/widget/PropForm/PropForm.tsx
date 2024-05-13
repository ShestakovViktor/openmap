import styles from "./PropForm.module.scss";
import en from "./string/en.json";

import i18next from "i18next";
import {JSX} from "solid-js";
import {Id} from "@type";
import {
    AssetForm,
    FileField,
    HeightField,
    NameField,
    WidthField,
} from "@ui/asset/widget";
import {useEditorContext} from "@ui/editor/context";
import {ASSET} from "@enum";

i18next.addResourceBundle("en", "prop", {PropForm: en}, true, true);

type Props = {
    onSubmit?: (AssetId: Id) => void;
    onClose?: () => void;
};

export function PropForm(props: Props): JSX.Element {
    const editorCtx = useEditorContext();

    const {id: typeId} = editorCtx.store.type
        .getByParams({name: ASSET.PROP})[0];

    const data = {typeId};

    return (
        <AssetForm onSubmit={props.onSubmit} data={data}>
            <NameField/>
            <WidthField/>
            <HeightField/>
            <FileField accept="image/*"/>
        </AssetForm>
    );
}