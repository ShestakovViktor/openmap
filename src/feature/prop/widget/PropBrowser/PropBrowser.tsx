import en from "./string/en.json";
import styles from "./PropBrowser.module.scss";

import {JSX} from "solid-js";
import i18next from "i18next";
import {AssetBrowser} from "@feature/asset/widget";
import {Modal, Dialog} from "@shared/widget";
import {ASSET_TYPE} from "@feature/asset/enum";
import {PropForm} from "../PropForm";
import {useStoreContext} from "@feature/store/context";

i18next.addResourceBundle("en", "prop", {"PropSelect": en}, true, true);

type Props = {
    selected?: number[];
    onSelect?: (ids: number[]) => void;
};

export function PropBrowser(props: Props): JSX.Element {
    const storeCtx = useStoreContext();

    const assetFormDialog = new Modal();
    assetFormDialog.render(
        <Dialog
            class={styles.AssetFormDialog}
            onClose={() => assetFormDialog.hide()}
        >
            <PropForm onSubmit={() => {
                assetFormDialog.hide();
            }}/>
        </Dialog>
    );

    return (
        <AssetBrowser
            type={ASSET_TYPE.PROP}
            selected={props.selected}
            onCreate={() => {
                assetFormDialog.show();
            }}
            onDelete={(ids) => {
                ids.forEach((id) => {
                    // storeCtx.store.asset.delete(id);
                });
            }}
            onSelect={props.onSelect}
        />
    );
}