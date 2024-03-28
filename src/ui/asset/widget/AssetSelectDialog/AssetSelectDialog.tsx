import en from "./string/en.json";
import styles from "./AssetSelectDialog.module.scss";
import SaltireIconSvg from "@public/icon/saltire.svg";

import {For, JSXElement, createEffect, createSignal, on} from "solid-js";
import {Button, Dialog, Modal} from "@ui/widget";
import {AssetCreateDialog} from "@ui/asset/widget/AssetCreateDialog";
import i18next from "i18next";
import {useViewerContext} from "@ui/viewer/context";
import {Asset, Id} from "@type";
import {EntityType} from "@enum";

i18next.addResourceBundle("en", "asset", {"AssetSelectDialog": en}, true, true);

type Props = {
    onSelect?: (assetId: Id) => void;
    onComplete: () => void;
};

export function AssetSelectDialog(props: Props): JSXElement {
    const viewerCtx = useViewerContext();

    const {id: assetTypeId} = viewerCtx.store.type
        .getByParams({name: EntityType.ASSET})[0];

    const getAssets = (): Asset[] => viewerCtx.store.entity
        .getByParams<Asset>({typeId: assetTypeId});

    const [assets, setAssets] = createSignal(getAssets());

    createEffect(on(viewerCtx.init, () => setAssets(getAssets())));

    const assetCreateModal = new Modal("#modal");
    assetCreateModal.render(
        <AssetCreateDialog
            onComplete={() => assetCreateModal.hide()}
            onClose={() => assetCreateModal.hide()}
        />
    );

    return (
        <Dialog
            class={styles.AssetSelectDialog}
            title={i18next.t(
                "asset:AssetSelectDialog.dialogTitle",
                {postProcess: ["capitalize"]}
            )}
            onClose={props.onComplete}
        >
            <div>
                <Button
                    label={i18next.t(
                        "asset:AssetSelectDialog.create",
                        {postProcess: ["capitalize"]}
                    )}
                    onClick={() => assetCreateModal.show()}
                />
            </div>
            <div>
                <For each={assets()}>
                    {(asset) =>
                        <div class={styles.AssetArea}>
                            <Button
                                class={styles.CloseButton}
                                icon={SaltireIconSvg}
                                onClick={() => {
                                    //viewerCtx.project().delAsset(id);
                                }}
                            />
                            <img
                                src={
                                    viewerCtx.store.source
                                        .getById(asset.sourceId).content
                                }
                                onClick={() => {
                                    if (props.onSelect) {
                                        props.onSelect(asset.id);
                                    }
                                    props.onComplete();
                                }}
                            />
                        </div>
                    }
                </For>
            </div>
        </Dialog>
    );
}