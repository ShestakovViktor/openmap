import en from "./string/en.json";
import styles from "./AssetInput.module.scss";
import SaltireIconSvg from "@public/icon/saltire.svg";

import {For, JSX, createEffect, createResource, createSignal, on} from "solid-js";
import {Button, Dialog, Modal} from "@ui/widget";
import {AssetForm} from "@ui/asset/widget/AssetForm";
import i18next from "i18next";
import {useViewerContext} from "@ui/viewer/context";
import {Asset, Id} from "@type";
import {EntityType} from "@enum";

i18next.addResourceBundle("en", "asset", {"AssetSelectInput": en}, true, true);

type Props = {
    onSelect?: (assetId: Id) => void;
    //onComplete: () => void;
};

export function AssetInput(props: Props): JSX.Element {
    const viewerCtx = useViewerContext();
    let inputRef: HTMLInputElement | undefined;
    const [selected, setSelected] = createSignal<number>();

    const {id: assetTypeId} = viewerCtx.store.type
        .getByParams({name: EntityType.ASSET})[0];

    const [assetsData, {refetch}] = createResource(() => {
        return viewerCtx.store.entity
            .getByParams<Asset>({typeId: assetTypeId});
    });

    createEffect(on(viewerCtx.init, refetch));

    const previews = (
        <For each={assetsData()}>
            {(assetData, index) =>
                <img
                    class={styles.Preview}
                    classList={{
                        [styles.Selected]: index() == selected(),
                    }}
                    src={
                        viewerCtx.store.source
                            .getById(assetData.sourceId).content
                    }
                    onClick={() => {
                        if (!inputRef) throw new Error();

                        if (index() == selected()) {
                            setSelected(undefined);
                            inputRef.value = "";
                        }
                        else {
                            setSelected(index());
                            inputRef.value = String(assetData.id);
                        }
                        inputRef.dispatchEvent(new Event("change", {bubbles: true}));
                    }}
                />
            }
        </For>
    );

    const assetFormDialog = new Modal();
    assetFormDialog.render(
        <Dialog>
            <AssetForm onComplete={() => assetFormDialog.hide()}/>
        </Dialog>
    );

    return (
        <div class={styles.AssetSelectInput}>
            <input ref={inputRef} name="assetId" type="hidden"/>
            <div class={styles.Showcase}>
                {previews}
                <button
                    class={styles.Preview}
                    onClick={() => {
                        assetFormDialog.show();
                    }}
                >+</button>
            </div>
        </div>
    );
}