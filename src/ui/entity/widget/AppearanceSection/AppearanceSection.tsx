import en from "./string/en.json";
import i18next from "i18next";
import styles from "./AppearanceSection.module.scss";
import ImageIconSvg from "@res/svg/image.svg";
import MotionIconSvg from "@res/svg/motion.svg";

import {Button, Dialog, Icon, Modal, Section, Toolbar} from "@ui/widget";
import {JSX, Resource, Show, createMemo} from "solid-js";
import {Id, Motion, Prop} from "@type";
import {PropBrowser} from "@ui/prop/widget";
import {assetToSrc} from "@ui/app/utiliy";
import {DATA} from "@enum";
import {useStoreContext} from "@ui/app/context";
import {MotionBrowser} from "@ui/motion/widget";

i18next.addResourceBundle("en", "entity", {AppearanceSection: en}, true, true);

type Props = {
    entity: Resource<{
        propId: Id | null;
        motionId?: Id | null;
    } | undefined>;
    motion?: boolean;
};

export function AppearanceSection(props: Props): JSX.Element {
    const storeCtx = useStoreContext();
    let propInput: HTMLInputElement;
    let motionInput: HTMLInputElement;

    const prop = createMemo((): Prop | null => {
        const entity = props.entity();
        const propId = entity ? entity.propId : null;
        return propId ? storeCtx.store.asset.getById<Prop>(propId) : null;
    });

    const selectedProp = createMemo(() => {
        const entity = props.entity();
        const id = entity ? entity.propId : null;
        return id ? [id] : [];
    });

    const propBrowserDialog = new Modal();
    propBrowserDialog.render(
        <Dialog
            class={styles.AssetBrowserDialog}
            onClose={() => propBrowserDialog.hide()}
        >
            <PropBrowser
                selected={selectedProp()}
                onSelect={(ids: Id[]) => {
                    propInput.value = String(ids[0]);
                    propInput.dispatchEvent(
                        new Event("change", {bubbles: true})
                    );
                    propBrowserDialog.hide();
                }}
            />
        </Dialog>
    );

    const motion = createMemo((): Motion | null => {
        const entity = props.entity();
        const motionId = entity ? entity.motionId : null;
        return motionId ? storeCtx.store.asset.getById<Motion>(motionId) : null;
    });

    const selectedMotion = createMemo(() => {
        const entity = props.entity();
        const id = entity ? entity.motionId : null;
        return id ? [id] : [];
    });

    const motionBrowserDialog = new Modal();
    motionBrowserDialog.render(
        <Dialog
            class={styles.AssetBrowserDialog}
            onClose={() => motionBrowserDialog.hide()}
        >
            <MotionBrowser
                selected={selectedMotion()}
                onSelect={(ids: Id[]) => {
                    motionInput.value = String(ids[0]);
                    motionInput.dispatchEvent(
                        new Event("change", {bubbles: true})
                    );
                    motionBrowserDialog.hide();
                }}
            />
        </Dialog>
    );

    return (
        <Section
            class={styles.AppearanceSection}
            title={
                i18next.t(
                    "entity:AppearanceSection.title",
                    {postProcess: ["capitalize"]}
                )
            }
        >
            <Toolbar>
                <Button
                    icon={ImageIconSvg}
                    onClick={() => propBrowserDialog.show()}
                />
                <Show when={props.motion}>
                    <Button
                        icon={MotionIconSvg}
                        onClick={() => motionBrowserDialog.show()}
                    />
                </Show>
            </Toolbar>

            <input
                ref={propInput!}
                name={"propId"}
                type={"hidden"}
                value={props.entity()?.propId ?? ""}
                data-type={DATA.REFERENCE}
            />
            <Show when={props.motion}>
                <input
                    ref={motionInput!}
                    name={"motionId"}
                    type={"hidden"}
                    value={props.entity()?.motionId ?? ""}
                    data-type={DATA.REFERENCE}
                />
            </Show>

            <Show
                when={prop()}
                fallback={(
                    <Icon
                        class={styles.Preview}
                        classList={{
                            [motion()?.class ?? ""]: props.motion && Boolean(motion()),
                        }}
                        svg={ImageIconSvg}
                        onPointerDown={() => propBrowserDialog.show()}
                    />
                )}
            >
                {(asset) => (
                    <img
                        class={styles.Preview}
                        classList={{
                            [motion()?.class ?? ""]: props.motion && Boolean(motion()),
                        }}
                        src={asset().path || assetToSrc(asset())}
                        draggable={false}
                        onPointerDown={() => propBrowserDialog.show()}
                    />
                )}
            </Show>
        </Section>
    );
}