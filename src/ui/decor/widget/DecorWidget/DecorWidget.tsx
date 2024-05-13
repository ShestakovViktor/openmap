import styles from "./DecorWidget.module.scss";
import {JSX, createEffect, createResource, on} from "solid-js";
import {useViewerContext} from "@ui/viewer/context";

import {Decor, Asset, Id, Motion} from "@type";
import {assetToSrc} from "@ui/app/utiliy";

type Props = {
    entityId: Id;
};

export function DecorWidget(props: Props): JSX.Element {
    const viewerCtx = useViewerContext();

    const [entity, {refetch}] = createResource(() => viewerCtx.store.entity
        .getById<Decor>(props.entityId));

    createEffect(on(viewerCtx.render, refetch));

    const x = (): string => {
        const data = entity();
        return (data ? data.x * viewerCtx.mapCtx.scale : 0) + "px";
    };

    const y = (): string => {
        const data = entity();
        return (data ? data.y * viewerCtx.mapCtx.scale : 0) + "px";
    };

    const src = (): string => {
        const propId = entity()?.propId;

        if (!propId) {
            return "./icon/decor.svg";
        }
        else {
            const asset = viewerCtx.store.asset
                .getById<Asset>(propId);

            if (!asset) throw new Error();

            return assetToSrc(asset);
        }
    };

    const motionStyle = (): string => {
        const motionId = entity()?.motionId;

        if (!motionId) {
            return "";
        }
        else {
            const motion = viewerCtx.store.asset
                .getById<Motion>(motionId);

            if (!motion) throw new Error();

            return motion.class;
        }
    };

    return (
        <div
            class={styles.DecorWidget}
            data-id={entity()?.id}
            data-type={"decor"}
            style={{transform: `translate3d(${x()}, ${y()}, 0)`}}
        >
            <div
                class={styles.Mark}
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