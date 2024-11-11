import styles from "./FigureSelect.module.scss";
import en from "./string/en.json";
import FigureIconSvg from "@res/svg/image.svg";
import NextIconSvg from "@res/svg/next.svg";
import PrevIconSvg from "@res/svg/prev.svg";
import PlusIconSvg from "@res/svg/plus.svg";
import SaltireIconSvg from "@res/svg/saltire.svg";

import {Accessor, For, JSX, createMemo, createSignal} from "solid-js";
import i18next from "i18next";
import {DATA_TYPE} from "@enum";
import {Button, Dialog, Icon, Modal} from "@shared/widget";
import {FigureBrowser} from "../FigureBrowser";
import {useStoreContext} from "@feature/store/context";
import {assetToSrc} from "@feature/app/utiliy";
import {Entity} from "@feature/entity/type";

i18next.addResourceBundle("en", "figure", {"FigureSelect": en}, true, true);

type Props = {
    entity: Accessor<Entity & {figureIds: (number | null)[]}>;
};

export function FigureSelect(props: Props): JSX.Element {
    const {store} = useStoreContext();

    let input: HTMLInputElement | undefined;

    const figureIds = createMemo(() => {
        return props.entity().figureIds;
    });

    const [selected, setSelected] = createSignal<number>(0);

    const foo = createMemo(() => {
        const id = figureIds()[selected()];
        return id ? [id] : [];
    });

    const figureBrowserDialog = new Modal();
    figureBrowserDialog.render(
        <Dialog
            class={styles.FigureBrowserDialog}
            onClose={() => figureBrowserDialog.hide()}
        >
            <FigureBrowser
                selected={foo()}
                onSelect={(ids: number[]) => {
                    const entity = props.entity();

                    const figureIds = [...entity.figureIds];
                    figureIds[selected()] = ids[0];

                    store.entity
                        .set<Entity & {figureIds: (number | null)[]}>(
                            entity.id,
                        {figureIds}
                        );
                    figureBrowserDialog.hide();
                }}
            />
        </Dialog>
    );

    return (
        <div class={styles.FigureSelect}>
            <input
                ref={input}
                name="figureIds"
                type="hidden"
                value={JSON.stringify(figureIds())}
                data-type={DATA_TYPE.ARRAY}
            />
            <div class={styles.Showcase}>
                <For each={figureIds()}>
                    {(id, index) => {
                        const asset = id
                            ? store.asset.getById(id) ?? undefined
                            : undefined;

                        const src = asset && (asset.path || assetToSrc(asset));

                        return (
                            <div class={styles.Figure}>
                                <div
                                    class={styles.Preview}
                                    onClick={() => {
                                        setSelected(index());
                                        figureBrowserDialog.show();
                                    }}
                                >
                                    {src
                                        ? <img src={src}/>
                                        : <Icon svg={FigureIconSvg}/>
                                    }
                                </div>
                                <div class={styles.Controls}>
                                    <Button icon={PrevIconSvg}/>
                                    <Button
                                        icon={SaltireIconSvg}
                                        onClick={() => {

                                            // setFigureIds((prev) =>
                                            //     prev.filter((v, i) => i != index())
                                            // );
                                            // input!.dispatchEvent(
                                            //     new Event("change", {bubbles: true})
                                            // );
                                        }}
                                    />
                                    <Button icon={NextIconSvg}/>
                                </div>
                            </div>
                        );
                    }}
                </For>
                <div class={styles.Figure}>
                    <div class={styles.Preview}>
                        <Button
                            icon={PlusIconSvg}
                            onClick={() => {
                                const entity = props.entity();
                                store.entity.set<Entity & {figureIds: (number | null)[]}>(
                                    entity.id,
                                {figureIds: [...entity.figureIds, null]}
                                );
                            }}
                        />
                    </div>
                    <div class={styles.Controls}>
                    </div>
                </div>
            </div>
        </div>
    );
}