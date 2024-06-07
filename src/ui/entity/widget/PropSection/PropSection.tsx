import en from "./string/en.json";
import i18next from "i18next";
import styles from "./PropSection.module.scss";
import SwatchbookIconSvg from "@res/svg/swatch-book.svg";
import MarkerIconSvg from "@res/svg/marker.svg";

import {Button, Dialog, Icon, Modal, Section, Toolbar} from "@ui/widget";
import {JSX, Resource, Show, createMemo} from "solid-js";
import {Id, Prop} from "@type";
import {PropBrowser} from "@ui/prop/widget";
import {assetToSrc} from "@ui/app/utiliy";
import {DATA} from "@enum";
import {useStoreContext} from "@ui/app/context";

i18next.addResourceBundle("en", "entity", {PropSection: en}, true, true);

type Entity = {propId: Id | null};

type Props = {
    entity: Resource<Entity | undefined>;
};

export function PropSection(props: Props): JSX.Element {
    const storeCtx = useStoreContext();
    let input: HTMLInputElement;

    const asset = createMemo((): Prop | null => {
        const entity = props.entity();
        const propId = entity ? entity.propId : null;
        return propId ? storeCtx.store.asset.getById<Prop>(propId) : null;
    });

    const selected = createMemo(() => {
        const entity = props.entity();
        const id = entity ? entity.propId : null;
        return id ? [id] : [];
    });

    const assetBrowserDialog = new Modal();
    assetBrowserDialog.render(
        <Dialog
            class={styles.AssetBrowserDialog}
            onClose={() => assetBrowserDialog.hide()}
        >
            <PropBrowser
                selected={selected()}
                onSelect={(ids: Id[]) => {
                    input.value = String(ids[0]);
                    input.dispatchEvent(
                        new Event("change", {bubbles: true})
                    );
                    assetBrowserDialog.hide();
                }}
            />
        </Dialog>
    );

    return (
        <Section
            class={styles.PropSection}
            title={
                i18next.t(
                    "entity:PropSection.title",
                    {postProcess: ["capitalize"]}
                )
            }
        >
            <Toolbar>
                <Button
                    icon={SwatchbookIconSvg}
                    onClick={() => assetBrowserDialog.show()}
                />
            </Toolbar>
            <input
                ref={input!}
                name={"propId"}
                type={"hidden"}
                value={props.entity()?.propId ?? ""}
                data-type={DATA.REFERENCE}
            />
            <Show
                when={asset()}
                fallback={(
                    <Icon
                        class={styles.Preview}
                        svg={MarkerIconSvg}
                        onPointerDown={() => assetBrowserDialog.show()}
                    />
                )}
            >
                {(asset) => (
                    <img
                        class={styles.Preview}
                        src={asset().path || assetToSrc(asset())}
                        draggable={false}
                        onPointerDown={() => assetBrowserDialog.show()}
                    />
                )}
            </Show>
        </Section>
    );
}