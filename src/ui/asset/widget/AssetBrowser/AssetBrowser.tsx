import PlusIconSvg from "@res/svg/plus.svg";
import SaltireIconSvg from "@res/svg/saltire.svg";
import styles from "./AssetBrowser.module.scss";
import en from "./string/en.json";

import {For, JSX, Show, createEffect, createResource, createSignal, on} from "solid-js";
import i18next from "i18next";
import {Asset, Id} from "@type";
import {Button} from "@ui/widget";
import {useSignalContext, useStoreContext} from "@ui/app/context";

i18next.addResourceBundle("en", "asset", {"AssetBrowser": en}, true, true);

type Props = {
    type?: Id;
    multiple?: boolean;
    selected?: Id[];
    onCreate?: () => void;
    onSelect?: (ids: Id[]) => void;
    onDelete?: (ids: Id[]) => void;
};

export function AssetBrowser(props: Props): JSX.Element {
    const {store} = useStoreContext();
    const {signal} = useSignalContext();

    const fetch = (): Asset[] => props.type
        ? store.asset.getByParams<Asset>({assetTypeId: props.type})
        : store.asset.getAll<Asset>();

    const [assets, {refetch}] = createResource<Asset[]>(fetch);

    createEffect(on(signal.asset.getUpdateById, refetch, {defer: true}));

    const [selected, setSelected] = createSignal<Id[]>([] as Id[]);

    createEffect(() => {
        setSelected(props.selected ?? []);
    });

    return (
        <div class={styles.AssetBrowser}>
            <div class={styles.Assets}>
                <table>
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>name</th>
                            <th>media</th>
                            <th>size (in kb)</th>
                            <th>
                                <Show when={props.onCreate}>
                                    <Button
                                        icon={PlusIconSvg}
                                        onClick={() => {
                                            if (props.onCreate) props.onCreate();
                                        }}
                                    />
                                </Show>
                            </th>
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
                                        if (props.onSelect) {
                                            props.onSelect(selected());
                                        }
                                    }}
                                >
                                    <td>{asset.id}</td>
                                    <td>{asset.name}</td>
                                    <td>{asset.media}</td>
                                    <td>{Math.floor(asset.size / 1024)}</td>
                                    <td>
                                        <Show when={props.onDelete}>
                                            <Button
                                                icon={SaltireIconSvg}
                                                onClick={() => {
                                                    if (props.onDelete) props.onDelete([asset.id]);
                                                    signal.asset.setUpdateById();
                                                }}
                                            />
                                        </Show>
                                    </td>
                                </tr>
                            }
                        </For>
                    </tbody>
                </table>
            </div>
            <button
                onClick={() => {
                    if (props.onSelect) props.onSelect(selected());
                }}
            >
                select
            </button>
        </div>
    );
}