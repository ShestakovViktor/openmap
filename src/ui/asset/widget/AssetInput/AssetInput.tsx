import en from "./string/en.json";
import styles from "./AssetInput.module.scss";

import {For, JSX, Resource, createEffect, createResource, createSignal, on} from "solid-js";
import {Dialog, Modal} from "@ui/widget";
import {AssetForm} from "@ui/asset/widget/AssetForm";
import i18next from "i18next";
import {useViewerContext} from "@ui/viewer/context";
import {Asset, Id, Source} from "@type";
import {EntityType} from "@enum";

i18next.addResourceBundle("en", "asset", {"AssetSelectInput": en}, true, true);

type Props = {
    entity: Resource<{assetId: Id | null} | null>;
};

export function AssetInput({entity}: Props): JSX.Element {
    const viewerCtx = useViewerContext();
    let inputRef: HTMLInputElement | undefined;
    const [selected, setSelected] = createSignal<number | null>(
        entity()?.assetId ?? null
    );

    const {id: assetTypeId} = viewerCtx.store.type
        .getByParams({name: EntityType.ASSET})[0];

    const [assetsData, {refetch}] = createResource<Asset[]>(() => {
        return viewerCtx.store.entity
            .getByParams<Asset>({typeId: assetTypeId});
    });

    createEffect(on(viewerCtx.init, refetch));

    const previews = (
        <For each={assetsData()}>
            {(asset, index) => {

                const src = (): string => {
                    const {sourceId} = asset;
                    if (!sourceId){
                        return "";
                    }
                    else {
                        const source = viewerCtx.store.source
                            .getById<Source>(asset.sourceId);

                        if (!source) throw new Error();

                        return source.path || source.content;
                    }
                };

                return <img
                    class={styles.Preview}
                    classList={{
                        [styles.Selected]: index() == selected(),
                    }}
                    src={src()}
                    onClick={() => {
                        if (!inputRef) throw new Error();

                        if (index() == selected()) {
                            setSelected(null);
                            inputRef.value = "";
                        }
                        else {
                            setSelected(index());
                            inputRef.value = String(asset.id);
                        }
                        inputRef.dispatchEvent(new Event("change", {bubbles: true}));
                    }}
                />;
            }}
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