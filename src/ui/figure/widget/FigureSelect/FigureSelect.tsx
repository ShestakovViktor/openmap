import styles from "./FigureSelect.module.scss";
import en from "./string/en.json";

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
import {FigureForm} from "@ui/figure/widget";
import {assetToSrc} from "@ui/app/utiliy";
import {useEditorContext} from "@ui/editor/context";

i18next.addResourceBundle("en", "prop", {"PropSelect": en}, true, true);

type Props = {
    entity: Resource<{figureIds: Id[]} | null>;
};

export function FigureSelect(props: Props): JSX.Element {
    const editorCtx = useEditorContext();
    let inputRef: HTMLInputElement | undefined;

    const [selected, {mutate: setSelected, refetch: getSelected}]
        = createResource<Id[]>(
            () => props.entity()?.figureIds ?? [],
            {initialValue: []}
        );

    createEffect(on(props.entity, getSelected));

    const [assetsData, {refetch}] = createResource<Asset[]>(() => {
        return editorCtx.store.asset
            .getByParams<Asset>({typeId: ASSET.FIGURE});
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
                        [styles.Selected]: selected().includes(asset.id),
                    }}
                    src={src()}
                    onClick={() => {
                        const index = selected().findIndex(
                            (id) => id == asset.id
                        );

                        if (index == -1) {
                            setSelected((prev) => [...prev, asset.id]);
                        }
                        else {
                            setSelected((prev) => {
                                return prev.filter((item, i) => i != index);
                            });
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
            class={styles.FigureDialog}
            onClose={() => assetFormDialog.hide()}
            close
        >
            <FigureForm onSubmit={() => assetFormDialog.hide()}/>
        </Dialog>
    );

    return (
        <div class={styles.FigureSelect}>
            <input
                ref={inputRef}
                name="figureIds"
                type="hidden"
                value={JSON.stringify(selected())}
                data-type="array"
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