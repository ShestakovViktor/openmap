import en from "./string/en.json";
import styles from "./MotionBrowser.module.scss";

import {JSX} from "solid-js";
import i18next from "i18next";
import {AssetBrowser} from "@feature/asset/widget";
import {Modal, Dialog} from "@shared/widget";
import {ASSET_TYPE} from "@feature/asset/enum";
import {useStoreContext} from "@feature/store/context";
import {MotionForm} from "@feature/motion/widget";

i18next.addResourceBundle("en", "motion", {"MotionBrowser": en}, true, true);

type Props = {
    selected?: number[];
    onSelect?: (ids: number[]) => void;
};

export function MotionBrowser(props: Props): JSX.Element {
    const storeCtx = useStoreContext();

    const motionFormDialog = new Modal();
    motionFormDialog.render(
        <Dialog
            class={styles.AssetFormDialog}
            onClose={() => motionFormDialog.hide()}
        >
            <MotionForm onSubmit={() => {
                motionFormDialog.hide();
            }}/>
        </Dialog>
    );

    return (
        <AssetBrowser
            type={ASSET_TYPE.MOTION}
            selected={props.selected}
            onCreate={() => {
                motionFormDialog.show();
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