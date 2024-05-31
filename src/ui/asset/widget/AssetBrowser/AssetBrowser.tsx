import styles from "./AssetBrowser.module.scss";
import en from "./string/en.json";

import {For, JSX, Show, ValidComponent, createEffect, createResource, createSignal, on} from "solid-js";
import {Dialog, Modal} from "@ui/widget";
import i18next from "i18next";
import {Asset, Id} from "@type";
import {useEditorContext} from "@ui/editor/context";
import {Dynamic} from "solid-js/web";

i18next.addResourceBundle("en", "asset", {"AssetBrowser": en}, true, true);

type Props = {
    type?: Id;
    form?: ValidComponent;
    multiple?: boolean;
    selected?: Id[];
    onSelect: (ids: Id[]) => void;
};

export function AssetBrowser(props: Props): JSX.Element {
    const editorCtx = useEditorContext();

    const fetch = (): Asset[] => props.type
        ? editorCtx.store.asset
            .getByParams<Asset>({assetTypeId: props.type})
        : editorCtx.store.asset
            .getAll<Asset>();

    const [assets, {refetch}] = createResource<Asset[]>(fetch);

    createEffect(on(editorCtx.init, refetch));

    const [selected, setSelected] = createSignal<Id[]>(props.selected ?? []);

    const assetFormDialog = new Modal();
    assetFormDialog.render(
        <Dialog
            class={styles.FormDialog}
            onClose={() => assetFormDialog.hide()}
        >
            <Dynamic
                component={props.form}
                onSubmit={() => assetFormDialog.hide()}
            />
        </Dialog>
    );

    return (
        <div class={styles.AssetBrowser}>
            <div class={styles.Controls}>
                <Show when={props.form}>
                    <button onClick={() => assetFormDialog.show()}>+</button>
                </Show>
            </div>
            <div class={styles.Assets}>
                <table>
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>name</th>
                            <th>media</th>
                            <th>size (in kb)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <For each={assets()}>
                            {(asset) =>
                                <tr
                                    classList={{
                                        [styles.Selected]: selected()
                                            .includes(asset.id),
                                    }}
                                    onClick={(event: MouseEvent) => {
                                        if (props.multiple && event.shiftKey) {
                                            setSelected((prev) => {
                                                return !prev.includes(asset.id)
                                                    ?  [...prev, asset.id]
                                                    : prev;
                                            });
                                        }
                                        else {
                                            setSelected([asset.id]);
                                        }
                                    }}
                                    onDblClick={() => {
                                        setSelected([asset.id]);
                                        props.onSelect(selected());
                                    }}
                                >
                                    <td>{asset.id}</td>
                                    <td>{asset.name}</td>
                                    <td>{asset.media}</td>
                                    <td>{Math.floor(asset.size / 1024)}</td>
                                </tr>
                            }
                        </For>
                    </tbody>
                </table>
            </div>
            <button onClick={() => props.onSelect(selected())}>select</button>
        </div>
    );
}