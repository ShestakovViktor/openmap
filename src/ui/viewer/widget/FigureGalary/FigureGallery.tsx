import styles from "./FigureGallery.module.scss";
import NextIconSvg from "@public/icon/next.svg";
import PrevIconSvg from "@public/icon/prev.svg";

import {Figure} from "@type";
import {For, JSX, createSignal} from "solid-js";
import {assetToSrc} from "@ui/app/utiliy";
import {Button} from "@ui/widget";

type Props = {
    figures: Figure[];
};

export function FigureGallery(props: Props): JSX.Element {
    const [selected, setSelected] = createSignal(0);

    const q = props.figures.length;

    return (
        <div class={styles.FigureGallery}>
            <div class={styles.Showcase}>
                <For each={props.figures}>
                    {(figure, index) => {
                        const src = figure.path || assetToSrc(figure);

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
                    onClick={() => setSelected(((selected() - 1) % q + q) % q)}
                />
                <Button
                    icon={NextIconSvg}
                    onClick={() => setSelected(((selected() + 1) % q + q) % q)}

                />
            </div>
        </div>
    );
}