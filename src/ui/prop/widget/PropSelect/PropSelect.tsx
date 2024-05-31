import en from "./string/en.json";
import styles from "./PropSelect.module.scss";

import {JSX, Resource, createComputed, createMemo, createSignal} from "solid-js";
import i18next from "i18next";
import {Id} from "@type";
import {AssetBrowser} from "@ui/asset/widget";
import {useEditorContext} from "@ui/editor/context";
import {Modal, Dialog} from "@ui/widget";
import {ASSET, DATA} from "@enum";
import {PropForm} from "../PropForm";

i18next.addResourceBundle("en", "prop", {"PropSelect": en}, true, true);

type Props = {
    entity: Resource<{propId: Id | null} | null>;
};

export function PropSelect(props: Props): JSX.Element {
    const editorCtx = useEditorContext();
    let input: HTMLInputElement | undefined;

    const [value, setValue] = createSignal<Id | undefined>(
        props.entity()?.propId ?? undefined
    );

    const selected = createMemo<Id[]>(() => {
        const selected = value();
        return selected ? [selected] : [];
    });

    const assetBrowserDialog = new Modal();
    assetBrowserDialog.render(
        <Dialog
            class={styles.AssetBrowserDialog}
            onClose={() => assetBrowserDialog.hide()}
        >
            <AssetBrowser
                type={ASSET.PROP}
                form={PropForm}
                selected={selected()}
                onSelect={(ids: Id[]) => {
                    setValue(ids[0]);
                    input!.dispatchEvent(
                        new Event("change", {bubbles: true})
                    );
                    assetBrowserDialog.hide();
                }}
            />
        </Dialog>
    );

    return (
        <div class={styles.PropSelect}>
            <input
                ref={input}
                name={"propId"}
                type={"hidden"}
                value={value() ?? ""}
                data-type={DATA.REFERENCE}
            />
            <div>{value()}</div>
            <button
                class={styles.Preview}
                onClick={() => {
                    assetBrowserDialog.show();
                }}
            >Choose asset</button>
        </div>
    );
}