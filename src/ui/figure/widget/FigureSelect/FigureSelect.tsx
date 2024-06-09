import styles from "./FigureSelect.module.scss";
import en from "./string/en.json";
import FigureIconSvg from "@res/svg/image.svg";
import NextIconSvg from "@res/svg/next.svg";
import PrevIconSvg from "@res/svg/prev.svg";
import PlusIconSvg from "@res/svg/plus.svg";
import SaltireIconSvg from "@res/svg/saltire.svg";

import {For, JSX, Resource, Show, createMemo, createResource, createSignal} from "solid-js";
import i18next from "i18next";
import {Id} from "@type";
import {DATA} from "@enum";
import {Button, Dialog, Icon, Modal} from "@ui/widget";
import {FigureBrowser} from "../FigureBrowser";
import {useStoreContext} from "@ui/app/context";
import {assetToSrc} from "@ui/app/utiliy";

i18next.addResourceBundle("en", "figure", {"FigureSelect": en}, true, true);

type Entity = {
    figureIds: (Id | null)[];
};

type Props = {
    entity: Resource<Entity | undefined>;
};

type FigureIds = (Id | null)[];

export function FigureSelect(props: Props): JSX.Element {
    const storeCtx = useStoreContext();

    let input: HTMLInputElement | undefined;
    const [figureIds, {mutate: setFigureIds}]
        = createResource<FigureIds, Entity | undefined>(
            () => props.entity(),
            (entity) => entity ? entity.figureIds : [],
            {initialValue: []}
        );

    const [selected, setSelected] = createSignal<Id>(0);

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
                onSelect={(ids: Id[]) => {
                    setFigureIds((prev) => [
                        ...(prev[selected()] = ids[0], prev),
                    ]);
                    input!.dispatchEvent(
                        new Event("change", {bubbles: true})
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
                data-type={DATA.ARRAY}
            />
            <div class={styles.Showcase}>
                <For each={figureIds()}>
                    {(id, index) => {
                        const asset = id
                            ? storeCtx.store.asset.getById(id) ?? undefined
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
                                            setFigureIds((prev) =>
                                                prev.filter((v, i) => i != index())
                                            );
                                            input!.dispatchEvent(
                                                new Event("change", {bubbles: true})
                                            );
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
                                setFigureIds((prev) => [...prev, null]);
                                input!.dispatchEvent(
                                    new Event("change", {bubbles: true})
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