import styles from "./FigureGallery.module.scss";
import NextIconSvg from "@res/svg/next.svg";
import PrevIconSvg from "@res/svg/prev.svg";
import FigureIconSvg from "@res/svg/figure.svg";

import {Figure, Id} from "@type";
import {For, JSX, Show, createMemo, createSignal} from "solid-js";
import {assetToSrc} from "@ui/app/utiliy";
import {Button, Icon} from "@ui/widget";
import {useStoreContext} from "@ui/app/context";

type Props = {
    figureIds: (Id | null)[];
};

export function FigureGallery(props: Props): JSX.Element {
    const storeCtx = useStoreContext();
    const [selected, setSelected] = createSignal(0);

    const q = createMemo((): number => props.figureIds.length);

    return (
        <div class={styles.FigureGallery}>
            <div class={styles.Showcase}>
                <For each={props.figureIds}>
                    {(id, index) => {
                        const asset = id
                            ? storeCtx.store.asset.getById(id) ?? undefined
                            : undefined;

                        const src = asset && (asset.path || assetToSrc(asset));
                        return (
                            <img
                                class={styles.Figure}
                                classList={{
                                    [styles.Selected]: index() == selected(),
                                }}
                                src={src}
                            />
                        );
                    }}
                </For>
            </div>
            <div class={styles.Controls}>
                <Button
                    icon={PrevIconSvg}
                    onClick={() => setSelected(((selected() - 1) % q() + q()) % q())}
                />
                <Button
                    icon={NextIconSvg}
                    onClick={() => setSelected(((selected() + 1) % q() + q()) % q())}

                />
            </div>
        </div>
    );
}