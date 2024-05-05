import styles from "./TileWidget.module.scss";
import {JSX, createResource} from "solid-js";
import {Asset, Id, Tile} from "@type";
import {useViewerContext} from "@ui/viewer/context";

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
            const image = viewerCtx.store.asset
                .getById<Asset>(imageId);

            if (!image) throw new Error();

            return image.path || image.content;
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