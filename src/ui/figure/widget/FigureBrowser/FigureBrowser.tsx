import en from "./string/en.json";
import styles from "./FigureBrowser.module.scss";

import {JSX} from "solid-js";
import i18next from "i18next";
import {Id} from "@type";
import {AssetBrowser} from "@ui/asset/widget";
import {Modal, Dialog} from "@ui/widget";
import {ASSET} from "@enum";
import {useStoreContext} from "@ui/app/context";
import {FigureForm} from "@ui/figure/widget";

i18next.addResourceBundle("en", "prop", {"PropSelect": en}, true, true);

type Props = {
    selected?: Id[];
    onSelect?: (ids: Id[]) => void;
};

export function FigureBrowser(props: Props): JSX.Element {
    const storeCtx = useStoreContext();

    const assetFormDialog = new Modal();
    assetFormDialog.render(
        <Dialog
            class={styles.AssetFormDialog}
            onClose={() => assetFormDialog.hide()}
        >
            <FigureForm onSubmit={() => assetFormDialog.hide()}/>
        </Dialog>
    );

    return (
        <AssetBrowser
            type={ASSET.FIGURE}
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