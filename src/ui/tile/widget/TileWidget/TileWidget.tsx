import styles from "./TileWidget.module.scss";
import {JSX, createResource} from "solid-js";
import {Id, Source, Tile} from "@type";
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
        const sourceId = entity()?.sourceId;

        if (!sourceId) {
            return "";
        }
        else {
            const source = viewerCtx.store.source
                .getById<Source>(sourceId);

            if (!source) throw new Error();

            return source.path || source.content;
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