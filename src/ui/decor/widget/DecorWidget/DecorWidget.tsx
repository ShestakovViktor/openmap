import styles from "./DecorWidget.module.scss";
import ImageIconSvg from "@res/svg/image.svg";
import {JSX, Show, createEffect, createMemo, createSignal, on} from "solid-js";
import {useViewerContext} from "@ui/viewer/context";

import {Decor, Asset, Motion, Prop} from "@type";
import {assetToSrc} from "@ui/app/utiliy";
import {useStoreContext} from "@ui/app/context";
import {Icon} from "@ui/widget";

type Props = {
    entity: Decor;
};

export function DecorWidget(props: Props): JSX.Element {
    const storeCtx = useStoreContext();
    const viewerCtx = useViewerContext();

    const fetchEntity = (): Decor => {
        const entity = storeCtx.store.entity.getById<Decor>(props.entity.id);
        if (!entity) throw new Error();
        return entity;
    };

    const equals = (prev: Decor, next: Decor): boolean => {
        return prev.x == next.x
            && prev.y == next.y
            && prev.width == next.width
            && prev.height == next.height
            && prev.propId == next.propId
            && prev.motionId == next.motionId;
    };

    const [entity, setEntity] = createSignal<Decor>(props.entity, {equals});

    createEffect(on(
        storeCtx.update.entity.get,
        (id) => (!id || id == props.entity.id) && setEntity(fetchEntity),
        {defer: true}
    ));

    const transform = createMemo((): string => {
        const x = entity().x * viewerCtx.viewport.getScale();
        const y = entity().y * viewerCtx.viewport.getScale();
        return `translate3d(${x}px, ${y}px, 0px)`;
    });

    const asset = createMemo((): Prop | null => {
        const propId = entity().propId;

        return propId
            ? storeCtx.store.asset.getById<Prop>(propId)
            : null;
    });

    const motionStyle = createMemo((): string => {
        const motionId = entity().motionId;

        if (!motionId) {
            return "";
        }
        else {
            const motion = storeCtx.store.asset
                .getById<Motion>(motionId);

            if (!motion) throw new Error();

            return motion.class;
        }
    });

    return (
        <div
            class={styles.DecorWidget}
            data-entity-id={entity().id}
            style={{transform: transform()}}
        >
            <div
                class={styles.Decor}

            >
                <Show
                    when={asset()}
                    fallback={(
                        <Icon
                            svg={ImageIconSvg}
                            class={styles.Prop}
                            classList={{
                                [motionStyle()]: Boolean(motionStyle()),
                            }}
                        />
                    )}
                >
                    {(asset) => (
                        <img
                            class={styles.Prop}
                            classList={{
                                [motionStyle()]: Boolean(motionStyle()),
                            }}
                            src={asset().path || assetToSrc(asset())}
                            draggable={false}
                        />
                    )}
                </Show>
            </div>
        </div>
    );
}