import styles from "./TileWidget.module.scss";
import {JSX, createResource} from "solid-js";
import {Asset, Id, Tile} from "@type";
import {useViewerContext} from "@ui/viewer/context";
import {assetToSrc} from "@ui/app/utiliy";

type Props = {
    entityId: Id;
};

export function TileWidget(props: Props): JSX.Element {
    const viewerCtx = useViewerContext();

    const [entity] = createResource(
        () => viewerCtx.store.entity
            .getById<Tile>(props.entityId)
    );

    const x = (): string => {
        const data = entity();
        return data ? `${data.x}px` : "0px";
    };

    const y = (): string => {
        const data = entity();
        return data ? `${data.y}px` : "0px";
    };

    const src = (): string => {
        const imageId = entity()?.imageId;

        if (!imageId) {
            return "";
        }
        else {
            const asset = viewerCtx.store.asset
                .getById<Asset>(imageId);

            if (!asset) throw new Error();

            return asset.path || assetToSrc(asset);
        }
    };

    return (
        <img
            class={styles.Tile}
            src={src()}
            draggable={false}
            style={{
                transform: `translate3d(${x()}, ${y()}, 0)`,
            }}
        />
    );
}