import styles from "./MarkerWidget.module.scss";
import {JSX, Show, createEffect, createMemo, createSignal, on} from "solid-js";
import {Marker, Prop} from "@type";
import {useViewerContext} from "@ui/viewer/context";
import {assetToSrc} from "@ui/app/utiliy";
import {EntityWidget} from "@ui/entity/widget";

type Props = {
    entity: Marker;
};

export function MarkerWidget(props: Props): JSX.Element {
    const viewerCtx = useViewerContext();

    const fetchEntity = (): Marker => {
        const entity = viewerCtx.store.entity.getById<Marker>(props.entity.id);
        if (!entity) throw new Error(String(props.entity.id));
        return entity;
    };

    const equals = (prev: Marker, next: Marker): boolean => {
        return prev.x == next.x
            && prev.y == next.y
            && prev.width == next.width
            && prev.height == next.height
            && prev.propId == next.propId;
    };

    const [entity, setEntity] = createSignal<Marker>(props.entity, {equals});

    createEffect(on(
        viewerCtx.render,
        (id) => (!id || id == props.entity.id) && setEntity(fetchEntity),
        {defer: true}
    ));

    const transform = createMemo((): string => {
        const x = entity().x * viewerCtx.layout.scale;
        const y = entity().y * viewerCtx.layout.scale;
        return `translate3d(${x}px, ${y}px, 0px)`;
    });

    const style = createMemo((): JSX.CSSProperties => {
        return {
            transform: "translate3d(-50%, -50%, 0)",
            width: entity().width + "px",
            height: entity().height + "px",
        };
    });

    const src = createMemo((): string => {
        const propId = entity().propId;

        if (!propId) {
            return "./icon/marker.svg";
        }
        else {
            const asset = viewerCtx.store.asset
                .getById<Prop>(propId);

            if (!asset) throw new Error();

            return asset.path || assetToSrc(asset);
        }
    });

    // function hideListener(event: PointerEvent): void {
    //     if (!ref.contains(event.target as HTMLElement)) {
    //         setShow(false);
    //     }
    // }

    // createEffect(on(show, (value) => {
    //     if (value) {
    //         window.addEventListener("pointerdown", hideListener);
    //     }
    //     else {
    //         window.removeEventListener("pointerdown", hideListener);
    //     }
    // }));

    const [show, setShow] = createSignal(false);

    return (
        <div
            class={styles.MarkerWidget}
            data-entity-id={entity().id}
            style={{transform: transform()}}
            draggable={false}
        >
            <div
                class={styles.Marker}
                style={style()}
            >
                <img
                    class={styles.Prop}
                    src={src()}
                    draggable={false}
                    onclick={(event) => {
                        setShow(!show());
                        event.stopPropagation();
                    }}
                />
            </div>

            <Show when={show() && entity().footnoteId}>
                {id => <EntityWidget entityId={id()}/>}
            </Show>
        </div>
    );
}