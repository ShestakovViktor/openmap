import styles from "./FigureSelect.module.scss";
import en from "./string/en.json";

import {
    For,
    JSX,
    Resource,
    createEffect,
    createResource,
    createSignal,
    on,
} from "solid-js";
import {Dialog, Modal} from "@ui/widget";
import i18next from "i18next";
import {Asset, Id} from "@type";
import {ASSET, DATA} from "@enum";
import {FigureForm} from "@ui/figure/widget";
import {assetToSrc} from "@ui/app/utiliy";
import {useEditorContext} from "@ui/editor/context";
import {AssetBrowser} from "@ui/asset/widget";

i18next.addResourceBundle("en", "prop", {"PropSelect": en}, true, true);

type Props = {
    entity: Resource<{figureIds: Id[]} | null>;
};

export function FigureSelect(props: Props): JSX.Element {
    const editorCtx = useEditorContext();
    let input: HTMLInputElement | undefined;

    const [value, setValue] = createSignal<Id[]>([]);

    const assetBrowserDialog = new Modal();
    assetBrowserDialog.render(
        <Dialog
            class={styles.AssetBrowserDialog}
            onClose={() => assetBrowserDialog.hide()}
        >
            <AssetBrowser
                type={ASSET.FIGURE}
                onSelect={(ids: Id[]) => {
                    setValue(ids);
                    input!.dispatchEvent(
                        new Event("change", {bubbles: true})
                    );
                    assetBrowserDialog.hide();
                }}
                multiple
            />
        </Dialog>
    );

    return (
        <div class={styles.FigureSelect}>
            <input
                ref={input}
                name="figureIds"
                type="hidden"
                value={JSON.stringify(value())}
                data-type={DATA.ARRAY}
            />
            <div class={styles.Showcase}>
                <button
                    class={styles.Preview}
                    onClick={() => {
                        assetBrowserDialog.show();
                    }}
                >+</button>
            </div>
        </div>
    );
}