import en from "./string/en.json";
import styles from "./PropSelect.module.scss";

import {JSX, Resource, createMemo} from "solid-js";
import i18next from "i18next";
import {Id, Prop} from "@type";
import {useEditorContext} from "@ui/editor/context";
import {Modal, Dialog} from "@ui/widget";
import {DATA} from "@enum";
import {assetToSrc} from "@ui/app/utiliy";
import {PropBrowser} from "../PropBrowser";

i18next.addResourceBundle("en", "prop", {"PropSelect": en}, true, true);

type Props = {
    entity: Resource<{propId: Id | null} | undefined>;
};

export function PropSelect(props: Props): JSX.Element {
    const editorCtx = useEditorContext();
    let input: HTMLInputElement | undefined;

    const propId = createMemo((): Id | null => {
        const entity = props.entity();
        return entity?.propId ?? null;
    });

    const selected = createMemo(() => {
        const id = propId();
        return id ? [id] : [];
    });

    const src = createMemo((): string => {
        const id = propId();

        if (!id) {
            return "./icon/no.svg";
        }
        else {
            const asset = editorCtx.store.asset
                .getById<Prop>(id);

            if (!asset) throw new Error();

            return asset.path || assetToSrc(asset);
        }
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
                value={propId() ?? ""}
                data-type={DATA.REFERENCE}
            />
            <img
                class={styles.Preview}
                src={src()}
                onClick={() => {
                    assetBrowserDialog.show();
                }}
            />
        </div>
    );
}