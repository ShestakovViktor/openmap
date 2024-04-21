import {For, JSX, Suspense, createEffect, createResource, createSignal, on} from "solid-js";
import styles from "./Group.module.scss";
import {useViewerContext} from "@ui/viewer/context";
import {Group as GroupData, Id} from "@type";
import {Entity} from "@ui/entity/widget";

type Props = {
    entityId: Id;
    ref?: HTMLDivElement;
};

export function Group(props: Props): JSX.Element {
    const viewerCtx = useViewerContext();

    const [entity, {refetch}] = createResource(() => viewerCtx.store.entity
        .getById<GroupData>(props.entityId));

    createEffect(on(viewerCtx.render, refetch));

    const childrenIds = (): number[] => {
        const data = entity();
        return data ? data.childrenIds : [];
    };

    function foo(name: string): JSX.CSSProperties {
        if (name == "root") {
            return {
                transform: `translate3d(${viewerCtx.mapCtx.x + "px"}, ${viewerCtx.mapCtx.y + "px"}, 0)`,
            };
        }
        else if (name == "map") {
            return {
                transform: `scale(${viewerCtx.mapCtx.scale})`,
            };
        }
        else {
            return {};
        }
    }

    return (
        <Suspense>

            <div
                class={styles.Group}
                id={entity()?.name}
                style={foo(entity()?.name ?? "")}
                ref={props.ref}
            >
                <For each={childrenIds()}>
                    {id => <Entity entityId={id}/>}
                </For>
            </div>
        </Suspense>
    );
}