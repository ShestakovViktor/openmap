import {JSX, JSXElement, createMemo} from "solid-js";
import styles from "./Group.module.scss";
import {useViewerContext} from "@ui/viewer/context";
import {Group as GroupData, Id} from "@type";
import {Entity} from "@ui/viewer/widget";

type Props = {
    entityId: Id;
    ref?: HTMLDivElement;
};

export function Group(props: Props): JSXElement {
    const context = useViewerContext();

    const entity = createMemo(
        () => context.store.entity.getById<GroupData>(props.entityId),
        undefined,
        {equals: false}
    );

    const childs = createMemo(
        () => entity().childrenIds.map(child => <Entity entityId={child}/>)
    );

    function foo(name: string): JSX.CSSProperties {
        if (name == "root") {
            return {
                transform: `translate3d(${context.mapCtx.x + "px"}, ${context.mapCtx.y + "px"}, 0)`,
            };
        }
        else if (name == "map") {
            return {
                transform: `scale(${context.mapCtx.scale})`,
            };
        }
        else {
            return {};
        }
    }

    return (
        <div
            class={styles.Group}
            id={entity().name}
            style={foo(entity().name)}
            ref={props.ref}
        >
            {childs()}
        </div>
    );
}