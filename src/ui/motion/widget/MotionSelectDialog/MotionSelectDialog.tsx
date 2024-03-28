import en from "./string/en.json";
import styles from "./MotionSelectDialog.module.scss";

import {Button, Dialog} from "@ui/widget";
import i18next from "i18next";
import {For, JSXElement, createEffect, createSignal, on} from "solid-js";
import {Modal} from "@ui/widget/Modal";
import {useViewerContext} from "@ui/viewer/context";
import {Id, Motion} from "@type";
import {MotionCreateDialog} from "../MotionCreateDialog";
import {MODAL_ID} from "@ui/editor/widget";
import {EntityType} from "@enum";

i18next.addResourceBundle("en", "motion", {"MotionSelectDialog": en}, true, true);

type Props = {
    onSelect?: (assetId: Id) => void;
    onComplete: () => void;
};

export function MotionSelectDialog(props: Props): JSXElement {
    const viewerCtx = useViewerContext();

    const {id: motionTypeId} = viewerCtx.store.type
        .getByParams({name: EntityType.MOTION})[0];

    const getMotions = (): Motion[] => viewerCtx.store.entity
        .getByParams<Motion>({typeId: motionTypeId});

    const [motions, setMotions] = createSignal(getMotions());

    createEffect(on(viewerCtx.init, () => {
        setMotions(getMotions());
    }));

    const motionCreateModal = new Modal("#" + MODAL_ID);
    motionCreateModal.render(
        <MotionCreateDialog
            onComplete={() => {
                motionCreateModal.hide();
                setMotions(getMotions());
            }}
            onClose={() => motionCreateModal.hide()}
        />
    );

    return (
        <Dialog
            class={styles.MotionSelectDialog}
            title={i18next.t(
                "motion:MotionSelectDialog.dialogTitle",
                {postProcess: ["capitalize"]}
            )}
            onClose={props.onComplete}
        >
            <div>
                <Button
                    label={i18next.t(
                        "motion:MotionSelectDialog.create",
                        {postProcess: ["capitalize"]}
                    )}
                    onClick={() => motionCreateModal.show()}
                />
            </div>
            <div>
                <For each={motions()}>
                    {(motion) =>
                        <div
                            onClick={() => {
                                if (props.onSelect) props.onSelect(motion.id);
                                props.onComplete();
                            }}
                        >
                            {motion.name}
                        </div>
                    }
                </For>
            </div>
        </Dialog>
    );
}