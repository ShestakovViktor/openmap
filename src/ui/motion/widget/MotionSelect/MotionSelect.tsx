import en from "./string/en.json";
import styles from "./MotionSelect.module.scss";

import {Dialog} from "@ui/widget";
import i18next from "i18next";
import {For, JSX, Resource, createEffect, createResource, on} from "solid-js";
import {Modal} from "@ui/widget/Modal";
import {Id, Motion} from "@type";
import {MotionForm} from "../MotionForm";
import {ASSET, DATA} from "@enum";
import {useStoreContext} from "@ui/app/context";

i18next.addResourceBundle("en", "motion", {"MotionSelectDialog": en}, true, true);

type Props = {
    entity: Resource<{motionId: Id | null} | undefined>;
};

export function MotionSelect({entity}: Props): JSX.Element {
    const storeCtx = useStoreContext();
    let inputRef: HTMLInputElement | undefined;

    const [selected, {mutate: setSelected, refetch: refetchSelected}]
        = createResource<Id | null>(() => entity()?.motionId ?? null);

    createEffect(on(entity, refetchSelected));

    const [motions, {refetch}] = createResource(() => {
        return storeCtx.store.asset
            .getByParams<Motion>({assetTypeId: ASSET.MOTION});
    });

    createEffect(on(
        storeCtx.update.asset.get,
        refetch,
        {defer: true}
    ));

    const motionFormDialog = new Modal();
    motionFormDialog.render(
        <Dialog
            class={styles.MotionDialog}
            onClose={() => motionFormDialog.hide()}
        >
            <MotionForm
                onSubmit={() => motionFormDialog.hide()}
            />
        </Dialog>
    );

    return (
        <div class={styles.MotionSelect}>
            <input
                ref={inputRef}
                name="motionId"
                type="hidden"
                data-type={DATA.REFERENCE}
                value={selected() ?? ""}
            />
            <div class={styles.Showcase}>
                <For each={motions()}>
                    {(motion) =>
                        <img
                            class={styles.Preview}
                            classList={{
                                [styles.Selected]: motion.id == selected(),
                                [motion.class]: true,
                            }}
                            onClick={() => {
                                if (motion.id == selected()) {
                                    setSelected(null);
                                }
                                else {
                                    setSelected(motion.id);
                                }

                                if (!inputRef) throw new Error();
                                inputRef.dispatchEvent(
                                    new Event("change", {bubbles: true})
                                );
                            }}
                            src="./icon/decor.svg"
                        />
                    }
                </For>
                <button
                    class={styles.Preview}
                    onClick={() => {
                        motionFormDialog.show();
                    }}
                >+</button>
            </div>
        </div>
    );
}