import styles from "./DecorWidget.module.scss";
import {JSX, createEffect, createMemo, createSignal, on} from "solid-js";
import {useViewerContext} from "@ui/viewer/context";

import {Decor, Asset, Motion} from "@type";
import {assetToSrc} from "@ui/app/utiliy";
import {updateEffect} from "@ui/viewer/utility";

type Props = {
    entity: Decor;
};

export function DecorWidget(props: Props): JSX.Element {
    const viewerCtx = useViewerContext();

    const fetchEntity = (): Decor => {
        const tile = viewerCtx.store.entity.getById<Decor>(props.entity.id);
        if (!tile) throw new Error(`Entity does not exists ${props.entity.id}`);
        return tile;
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

    updateEffect(viewerCtx.render, fetchEntity, setEntity, props.entity.id);

    const transform = createMemo((): string => {
        const x = entity().x * viewerCtx.layout.scale;
        const y = entity().y * viewerCtx.layout.scale;
        return `translate3d(${x}px, ${y}px, 0px)`;
    });

    const src = createMemo((): string => {
        const propId = entity().propId;

        if (!propId) {
            return "./icon/decor.svg";
        }
        else {
            const asset = viewerCtx.store.asset
                .getById<Asset>(propId);

            if (!asset) throw new Error();

            return assetToSrc(asset);
        }
    });

    const motionStyle = createMemo((): string => {
        const motionId = entity().motionId;

        if (!motionId) {
            return "";
        }
        else {
            const motion = viewerCtx.store.asset
                .getById<Motion>(motionId);

            if (!motion) throw new Error();

            return motion.class;
        }
    });

    return (
        <div
            class={styles.DecorWidget}
            data-id={entity().id}
            style={{transform: transform()}}
        >
            <div
                class={styles.Decor}
            >
                <img
                    classList={{
                        [motionStyle()]: Boolean(motionStyle()),
                    }}
                    src={src()}
                    draggable={false}
                />
            </div>
        </div>
    );
}