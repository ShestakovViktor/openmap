import en from "./string/en.json";
import styles from "./PropBrowser.module.scss";

import {JSX} from "solid-js";
import i18next from "i18next";
import {Id} from "@type";
import {AssetBrowser} from "@ui/asset/widget";
import {Modal, Dialog} from "@ui/widget";
import {ASSET} from "@enum";
import {PropForm} from "../PropForm";
import {useStoreContext} from "@ui/app/context";

i18next.addResourceBundle("en", "prop", {"PropSelect": en}, true, true);

type Props = {
    selected?: Id[];
    onSelect?: (ids: Id[]) => void;
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
            type={ASSET.PROP}
            selected={props.selected}
            onCreate={() => {
                assetFormDialog.show();
            }}
            onDelete={(ids) => {
                ids.forEach((id) => {
                    storeCtx.store.asset.del(id);
                });
            }}
            onSelect={props.onSelect}
        />
    );
}