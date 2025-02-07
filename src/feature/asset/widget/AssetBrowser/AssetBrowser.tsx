import PlusIconSvg from "@res/svg/plus.svg";
import SaltireIconSvg from "@res/svg/saltire.svg";
import styles from "./AssetBrowser.module.scss";
import en from "./string/en.json";

import {For, JSX, Show, createEffect, createMemo, createSignal} from "solid-js";
import i18next from "i18next";
import {Button} from "@shared/widget";
import {useStoreContext} from "@feature/store/context";
import {Asset} from "@feature/asset/type";

i18next.addResourceBundle("en", "asset", {"AssetBrowser": en}, true, true);

type Props = {
    type?: number;
    multiple?: boolean;
    selected?: number[];
    onCreate?: () => void;
    onSelect?: (ids: number[]) => void;
    onDelete?: (ids: number[]) => void;
};

export function AssetBrowser(props: Props): JSX.Element {
    const storeCtx = useStoreContext();

    const assets = createMemo(() => {
        return props.type
            ? storeCtx.store.asset.getByParams<Asset>({assetTypeId: props.type})
            : storeCtx.store.asset.getAll<Asset>();
    });

    const [selected, setSelected] = createSignal<number[]>([] as number[]);

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