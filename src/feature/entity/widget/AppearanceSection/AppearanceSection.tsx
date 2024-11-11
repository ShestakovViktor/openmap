import en from "./string/en.json";
import i18next from "i18next";
import styles from "./AppearanceSection.module.scss";
import ImageIconSvg from "@res/svg/image.svg";
import MotionIconSvg from "@res/svg/motion.svg";

import {Button, Dialog, Icon, Modal, Section, Toolbar} from "@shared/widget";
import {Accessor, JSX, Show, createMemo} from "solid-js";
import {PropBrowser} from "@feature/prop/widget";
import {assetToSrc} from "@feature/app/utiliy";
import {DATA_TYPE} from "@enum";
import {useStoreContext} from "@feature/store/context";
import {MotionBrowser} from "@feature/motion/widget";
import {Entity} from "@feature/entity/type";
import {Motion} from "@feature/motion/type";
import {Prop} from "@feature/prop/type";

i18next.addResourceBundle("en", "entity", {AppearanceSection: en}, true, true);

type Props = {
    entity: Accessor<Entity & {
        propId: number | null;
        motionId?: number | null;
    }>;
    motion?: boolean;
};

export function AppearanceSection(props: Props): JSX.Element {
    const {store} = useStoreContext();
    let propInput: HTMLInputElement;
    let motionInput: HTMLInputElement;

    const prop = createMemo((): Prop | undefined => {
        const propId = props.entity().propId;
        return propId ? store.asset.getById<Prop>(propId) : undefined;
    });

    const selectedProp = createMemo(() => {
        const entity = props.entity();
        const id = entity.propId;
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
                onSelect={(ids: number[]) => {
                    store.entity.set<Entity & {propId: number}>(
                        props.entity().id,
                        {propId: ids[0]}
                    );
                    propBrowserDialog.hide();
                }}
            />
        </Dialog>
    );

    const motion = createMemo((): Motion | undefined => {
        const {motionId} = props.entity();
        return motionId ? store.asset.getById<Motion>(motionId) : undefined;
    });

    const selectedMotion = createMemo(() => {
        const {motionId} = props.entity();
        return motionId ? [motionId] : [];
    });

    const motionBrowserDialog = new Modal();
    motionBrowserDialog.render(
        <Dialog
            class={styles.AssetBrowserDialog}
            onClose={() => motionBrowserDialog.hide()}
        >
            <MotionBrowser
                selected={selectedMotion()}
                onSelect={(ids: number[]) => {
                    store.entity.set<Entity & {motionId: number}>(
                        props.entity().id,
                        {motionId: ids[0]}
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
                value={props.entity().propId ?? ""}
                data-type={DATA_TYPE.REFERENCE}
            />
            <Show when={props.motion}>
                <input
                    ref={motionInput!}
                    name={"motionId"}
                    type={"hidden"}
                    value={props.entity().motionId ?? ""}
                    data-type={DATA_TYPE.REFERENCE}
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