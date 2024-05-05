import en from "./string/en.json";
import styles from "./PropSelect.module.scss";

import {
    For,
    JSX,
    Resource,
    createEffect,
    createResource,
    createSignal,
    on,
} from "solid-js";
import {Dialog, Modal} from "@ui/widget";
import i18next from "i18next";
import {useViewerContext} from "@ui/viewer/context";
import {Asset, Id} from "@type";
import {AssetType} from "@enum";
import {PropForm} from "../PropForm";

i18next.addResourceBundle("en", "prop", {"PropSelect": en}, true, true);

type Props = {
    entity: Resource<{propId: Id | null} | null>;
};

export function PropSelect(props: Props): JSX.Element {
    const viewerCtx = useViewerContext();
    let inputRef: HTMLInputElement | undefined;
    const [selected, setSelected] = createSignal<number | null>(
        props.entity()?.propId ?? null
    );

    const {id: propTypeId} = viewerCtx.store.type
        .getByParams({name: AssetType.PROP})[0];

    const [assetsData, {refetch}] = createResource<Asset[]>(() => {
        return viewerCtx.store.asset
            .getByParams<Asset>({typeId: propTypeId});
    });

    createEffect(on(viewerCtx.init, refetch));

    const previews = (
        <For each={assetsData()}>
            {(asset, index) => {

                const src = (): string => {
                    return asset.path || asset.content;
                };

                return <img
                    class={styles.Preview}
                    classList={{
                        [styles.Selected]: asset.id == selected(),
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
            <PropForm onComplete={() => assetFormDialog.hide()}/>
        </Dialog>
    );

    return (
        <div class={styles.PropSelect}>
            <input ref={inputRef} name="propId" type="hidden"/>
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