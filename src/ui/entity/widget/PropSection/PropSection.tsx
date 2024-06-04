import en from "./string/en.json";
import i18next from "i18next";
import styles from "./PropSection.module.scss";
import PaletteIconSvg from "@public/icon/palette.svg";

import {Button, Dialog, Modal, Section, Toolbar} from "@ui/widget";
import {JSX, Resource, createMemo, createResource} from "solid-js";
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
    let input: HTMLInputElement | undefined;

    const [propId, {mutate: setPropId}]
        = createResource<Id | null, Entity | undefined>(
            () => props.entity(),
            (entity) => entity ? entity.propId : null,
            {initialValue: null}
        );

    const src = createMemo((): string => {
        const id = propId();

        if (!id) {
            return "./icon/no.svg";
        }
        else {
            const asset = storeCtx.store.asset
                .getById<Prop>(id);

            if (!asset) throw new Error();

            return asset.path || assetToSrc(asset);
        }
    });

    const selected = createMemo(() => {
        const id = propId();
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
                    if (input) {
                        input.value = String(ids[0]);
                        input.dispatchEvent(
                            new Event("change", {bubbles: true})
                        );
                    }
                    setPropId(ids[0]);
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
                    icon={PaletteIconSvg}
                    onClick={() => {
                        assetBrowserDialog.show();
                    }}
                />
            </Toolbar>
            <input
                ref={input}
                name={"propId"}
                type={"hidden"}
                value={propId() ?? ""}
                data-type={DATA.REFERENCE}
            />
            <img
                class={styles.Preview}
                src={src()}
            />
        </Section>
    );
}