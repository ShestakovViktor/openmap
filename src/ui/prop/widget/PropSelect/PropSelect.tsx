import en from "./string/en.json";
import styles from "./PropSelect.module.scss";

import {
    For,
    JSX,
    Resource,
    createEffect,
    createResource,
    on,
} from "solid-js";
import {Dialog, Modal} from "@ui/widget";
import i18next from "i18next";
import {Asset, Id} from "@type";
import {ASSET} from "@enum";
import {PropForm} from "../PropForm";
import {assetToSrc} from "@ui/app/utiliy";
import {useEditorContext} from "@ui/editor/context";

i18next.addResourceBundle("en", "prop", {"PropSelect": en}, true, true);

type Props = {
    entity: Resource<{propId: Id | null} | null>;
};

export function PropSelect(props: Props): JSX.Element {
    const editorCtx = useEditorContext();
    let inputRef: HTMLInputElement | undefined;

    const [selected, {mutate: setSelected, refetch: getSelected}]
        = createResource<number | undefined>(
            () => props.entity()?.propId ?? undefined
        );

    createEffect(on(props.entity, getSelected));

    const {id: propTypeId} = editorCtx.store.type
        .getByParams({name: ASSET.PROP})[0];

    const [assetsData, {refetch}] = createResource<Asset[]>(() => {
        return editorCtx.store.asset
            .getByParams<Asset>({typeId: propTypeId});
    });

    createEffect(on(editorCtx.init, refetch));

    const previews = (
        <For each={assetsData()}>
            {(asset) => {
                const src = (): string => {
                    return asset.path || assetToSrc(asset);
                };

                return <img
                    class={styles.Preview}
                    classList={{
                        [styles.Selected]: asset.id == selected(),
                    }}
                    src={src()}
                    onClick={() => {
                        if (asset.id == selected()) {
                            setSelected();
                        }
                        else {
                            setSelected(asset.id);
                        }
                        if (!inputRef) throw new Error();
                        inputRef.dispatchEvent(
                            new Event("change", {bubbles: true})
                        );
                    }}
                />;
            }}
        </For>
    );

    const assetFormDialog = new Modal();
    assetFormDialog.render(
        <Dialog
            class={styles.PropDialog}
            onClose={() => assetFormDialog.hide()}
            close
        >
            <PropForm onSubmit={() => assetFormDialog.hide()}/>
        </Dialog>
    );

    return (
        <div class={styles.PropSelect}>
            <input
                ref={inputRef}
                name="propId"
                type="hidden"
                value={selected()}
                data-type="id"
            />
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