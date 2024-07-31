import en from "./string/en.json";
import styles from "./MotionBrowser.module.scss";

import {JSX} from "solid-js";
import i18next from "i18next";
import {Id} from "@type";
import {AssetBrowser} from "@ui/asset/widget";
import {Modal, Dialog} from "@ui/widget";
import {ASSET} from "@enum";
import {useStoreContext} from "@ui/app/context";
import {MotionForm} from "@ui/motion/widget";

i18next.addResourceBundle("en", "motion", {"MotionBrowser": en}, true, true);

type Props = {
    selected?: Id[];
    onSelect?: (ids: Id[]) => void;
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
            type={ASSET.MOTION}
            selected={props.selected}
            onCreate={() => {
                motionFormDialog.show();
            }}
            onDelete={(ids) => {
                ids.forEach((id) => {
                    storeCtx.store.asset.delete(id);
                });
            }}
            onSelect={props.onSelect}
        />
    );
}