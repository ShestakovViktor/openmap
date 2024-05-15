import en from "./string/en.json";
import styles from "./MotionSelect.module.scss";

import {Dialog} from "@ui/widget";
import i18next from "i18next";
import {For, JSX, Resource, createEffect, createResource, createSignal, on} from "solid-js";
import {Modal} from "@ui/widget/Modal";
import {Id, Motion} from "@type";
import {MotionForm} from "../MotionForm";
import {ASSET} from "@enum";
import {useEditorContext} from "@ui/editor/context";
import {Entity} from "@ui/entity/widget";

i18next.addResourceBundle("en", "motion", {"MotionSelectDialog": en}, true, true);

type Props = {
    entity: Resource<{motionId: Id | null} | null>;
};

export function MotionSelect({entity}: Props): JSX.Element {
    const editorCtx = useEditorContext();
    let inputRef: HTMLInputElement | undefined;

    const [selected, {mutate: setSelected, refetch: refetchSelected}]
        = createResource<Id | null>(() => entity()?.motionId ?? null);

    createEffect(on(entity, refetchSelected));

    const {id: motionTypeId} = editorCtx.store.type
        .getByParams({name: ASSET.MOTION})[0];

    const [motions, {refetch}] = createResource(() => {
        return editorCtx.store.asset
            .getByParams<Motion>({typeId: motionTypeId});
    });

    createEffect(on(editorCtx.init, refetch));

    const motionFormDialog = new Modal();
    motionFormDialog.render(
        <Dialog
            class={styles.MotionDialog}
            onClose={() => motionFormDialog.hide()}
            close
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
                data-type="id"
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