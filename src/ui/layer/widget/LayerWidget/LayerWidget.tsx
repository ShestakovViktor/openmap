import {For, JSX, createMemo, createSignal} from "solid-js";
import styles from "./LayerWidget.module.scss";
import {useViewerContext} from "@ui/viewer/context";
import {Layer} from "@type";
import {EntityWidget} from "@ui/entity/widget";
import {LAYER} from "@enum";
import {updateEffect} from "@ui/viewer/utility";

type Props = {
    entity: Layer;
};

export function LayerWidget(props: Props): JSX.Element {
    const viewerCtx = useViewerContext();

    const fetchEntity = (): Layer => {
        const entity = viewerCtx.store.entity.getById<Layer>(props.entity.id);
        if (!entity) throw new Error(String(props.entity.id));
        return entity;
    };

    const equals = (prev: Layer, next: Layer): boolean => {
        return prev.childIds.length == next.childIds.length;
    };

    const [entity, setEntity] = createSignal<Layer>(props.entity, {equals});

    updateEffect(viewerCtx.render, fetchEntity, setEntity, props.entity.id);

    const style = createMemo((): JSX.CSSProperties => {
        const name = entity().name;

        if (name == LAYER.ROOT) {
            const x = viewerCtx.layout.x;
            const y = viewerCtx.layout.y;
            return {
                transform: `translate3d(${x}px, ${y}px, 0px)`,
            };
        }
        else if (name == LAYER.MAP) {
            const scale = viewerCtx.layout.scale;
            return {
                transform: `scale(${scale})`,
            };
        }
        else {
            return {};
        }
    });

    return (
        <div
            class={styles.Layer}
            data-entity-id={entity().id}
            style={style()}
        >
            <For each={entity().childIds}>
                {id => <EntityWidget entityId={id}/>}
            </For>
        </div>
    );
}