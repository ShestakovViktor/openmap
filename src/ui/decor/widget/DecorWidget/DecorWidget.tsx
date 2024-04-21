import styles from "./DecorWidget.module.scss";
import {JSX, createEffect, createResource, createSignal, on} from "solid-js";
import {useViewerContext} from "@ui/viewer/context";

import {Decor, Asset, Id, Motion, Source} from "@type";

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
        return data
            ? `calc(${data.x * viewerCtx.mapCtx.scale}px - 50%)`
            : "0px";
    };

    const y = (): string => {
        const data = entity();
        return data
            ? `calc(${data.y * viewerCtx.mapCtx.scale}px - 50%)`
            : "0px";
    };
    const src = (): string => {
        const assetId = entity()?.assetId;

        if (!assetId) {
            return "./icon/decor.svg";
        }
        else {
            const asset = viewerCtx.store.entity
                .getById<Asset>(assetId);

            const source = viewerCtx.store.source
                .getById<Source>(asset.sourceId);

            return source.path || source.content;
        }
    };

    const style = (): string => {
        const motionId = entity()?.motionId;

        if (!motionId) {
            return "";
        }
        else {
            const motion = viewerCtx.store.entity
                .getById<Motion>(motionId);

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
            <img
                class={styles.Mark}
                classList={{
                    [style()]: Boolean(style()),
                }}
                src={src()}
            />
        </div>
    );
}