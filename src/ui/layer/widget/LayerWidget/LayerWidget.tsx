import {Accessor, For, JSX} from "solid-js";
import styles from "./LayerWidget.module.scss";
import {Layer} from "@type";
import {EntityWidget} from "@ui/entity/widget";

type Props = {
    entity: Accessor<Layer>;
};

export function LayerWidget(props: Props): JSX.Element {
    const {entity} = props;

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