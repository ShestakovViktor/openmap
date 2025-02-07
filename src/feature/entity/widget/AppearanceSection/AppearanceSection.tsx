import en from "./string/en.json";
import i18next from "i18next";
import styles from "./AppearanceSection.module.scss";
import ImageIconSvg from "@res/svg/image.svg";
import MotionIconSvg from "@res/svg/motion.svg";

import {Button, Dialog, Icon, Modal, Section, Toolbar} from "@shared/widget";
import {Accessor, JSX, Show, createMemo} from "solid-js";
import {PropBrowser} from "@feature/prop/widget";
import {useStoreContext} from "@feature/store/context";
import {MotionBrowser} from "@feature/motion/widget";
import {Entity} from "@feature/entity/type";
import {Motion} from "@feature/motion/type";
import {Prop} from "@feature/prop/type";
import {useViewerContext} from "@feature/viewer/context";

i18next.addResourceBundle("en", "entity", {AppearanceSection: en}, true, true);

type Props = {
    entity: Accessor<Entity & {
        propId: number | null;
        motionId?: number | null;
    }>;
    motion?: boolean;
};

export function AppearanceSection(props: Props): JSX.Element {
    const storeCtx = useStoreContext();
    const viewerCtx = useViewerContext();

    const propSrc = createMemo((): string | undefined => {
        const propId = props.entity().propId;

        if (!propId) return undefined;

        const prop = storeCtx.store.asset.getById<Prop>(propId);

        if (!prop) return undefined;

        const src = viewerCtx.path + prop.path;

        return src;
    });

    const selectedProp = createMemo(() => {
        const propId = props.entity().propId;
        return propId ? [propId] : [];
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
                    storeCtx.store.entity.set<Entity & {propId: number}>(
                        props.entity().id,
                        {propId: ids[0]}
                    );
                    propBrowserDialog.hide();
                }}
            />
        </Dialog>
    );

    const motionClass = createMemo((): string | undefined => {
        const motionId = props.entity().motionId;

        if (!motionId) return undefined;

        const motion = storeCtx.store.asset.getById<Motion>(motionId);

        if (!motion) return undefined;

        return motion.class;
    });

    const classList = createMemo(() => {
        return {[motionClass() || ""]:  Boolean(motionClass())};
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
                    storeCtx.store.entity.set<Entity & {motionId: number}>(
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
            title={i18next.t(
                "entity:AppearanceSection.title",
                {postProcess: ["capitalize"]}
            )}
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

            <Show
                when={propSrc()}
                fallback={(
                    <Icon
                        class={styles.Preview}
                        classList={classList()}
                        svg={ImageIconSvg}
                        onPointerDown={() => propBrowserDialog.show()}
                    />
                )}
            >
                {<img
                    class={styles.Preview}
                    classList={classList()}
                    src={propSrc()}
                    draggable={false}
                    onPointerDown={() => propBrowserDialog.show()}
                />}
            </Show>
        </Section>
    );
}