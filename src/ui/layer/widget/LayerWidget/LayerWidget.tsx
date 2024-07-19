import {For, JSX, createEffect, createSignal, on} from "solid-js";
import styles from "./LayerWidget.module.scss";
import {Layer} from "@type";
import {EntityWidget} from "@ui/entity/widget";
import {useStoreContext} from "@ui/app/context";

type Props = {
    entity: Layer;
};

export function LayerWidget(props: Props): JSX.Element {
    const storeCtx = useStoreContext();

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

    return (
        <div
            class={styles.Layer}
            data-entity-id={entity().id}
        >
            <For each={entity().childIds}>
                {id => <EntityWidget entityId={id}/>}
            </For>
        </div>
    );
}