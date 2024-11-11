import en from "./string/en.json";
import styles from "./FigureBrowser.module.scss";

import {JSX} from "solid-js";
import i18next from "i18next";
import {AssetBrowser} from "@feature/asset/widget";
import {Modal, Dialog} from "@shared/widget";
import {ASSET_TYPE} from "@feature/asset/enum";
import {useStoreContext} from "@feature/store/context";
import {FigureForm} from "@feature/figure/widget";

i18next.addResourceBundle("en", "prop", {"PropSelect": en}, true, true);

type Props = {
    selected?: number[];
    onSelect?: (ids: number[]) => void;
};

export function FigureBrowser(props: Props): JSX.Element {
    const {store} = useStoreContext();

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
            type={ASSET_TYPE.FIGURE}
            selected={props.selected}
            onCreate={() => {
                assetFormDialog.show();
            }}
            onDelete={(ids) => {
                ids.forEach((id) => {
                    // store.asset.delete(id);
                });
            }}
            onSelect={props.onSelect}
        />
    );
}