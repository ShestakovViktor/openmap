import {For, JSX, createEffect, createMemo, createSignal, on} from "solid-js";
import styles from "./LayerWidget.module.scss";
import {Layer} from "@type";
import {LAYER} from "@enum";
import {EntityWidget} from "@ui/entity/widget";
import {useStoreContext} from "@ui/app/context";
import {useViewerContext} from "@ui/viewer/context";

type Props = {
    entity: Layer;
};

export function LayerWidget(props: Props): JSX.Element {
    const storeCtx = useStoreContext();
    const viewerCtx = useViewerContext();

    const fetchEntity = (): Layer => {
        const entity = storeCtx.store.entity.getById<Layer>(props.entity.id);
        if (!entity) throw new Error(String(props.entity.id));
        return entity;
    };

    const equals = (prev: Layer, next: Layer): boolean => {
        return prev.childIds.length == next.childIds.length;
    };

    const [entity, setEntity] = createSignal<Layer>(props.entity, {equals});

    createEffect(on(
        storeCtx.update.entity.get,
        (id) => (!id || id == props.entity.id) && setEntity(fetchEntity),
        {defer: true}
    ));

    const style = createMemo((): JSX.CSSProperties => {
        const name = entity().name;

        if (name == LAYER.ROOT) {
            const x = viewerCtx.layout.x;
            const y = viewerCtx.layout.y;
            return {
                transform: `translate3d(${x}px, ${y}px, 0px)`,
            };
        }
        else if (name == LAYER.BACKGROUND) {
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