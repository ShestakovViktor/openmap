import {createMemo, For, JSX} from "solid-js";
import styles from "./LayerWidget.module.scss";
import {EntityWidget} from "@feature/entity/widget";
import {useViewerContext} from "@feature/viewer/context";
import {Layer} from "@feature/layer/type";
import {DISPLAY_OPTION} from "@feature/entity/enum";

type Props = {
    entity: Layer;
};

export function LayerWidget(props: Props): JSX.Element {
    const {entity} = props;
    const viewerCtx = useViewerContext();

    const transform = createMemo((): string => {
        if (entity.displayOptionIds.includes(DISPLAY_OPTION.MOVABLE)) {
            const x = entity.x || 0 + viewerCtx.state.x;
            const y = entity.y || 0 + viewerCtx.state.y;
            return `translate3d(${x}px, ${y}px, 0px)`;
        }
        else if (entity.displayOptionIds.includes(DISPLAY_OPTION.SCALABLE)) {
            return `scale(${viewerCtx.state.scale})`;
        }
        else {
            return "";
        }
    });

    return (
        <div
            class={styles.Layer}
            data-entity-id={entity.id}
            style={{transform: transform()}}
        >
            <For each={entity.childIds}>
                {id => <EntityWidget entityId={id}/>}
            </For>
        </div>
    );
}