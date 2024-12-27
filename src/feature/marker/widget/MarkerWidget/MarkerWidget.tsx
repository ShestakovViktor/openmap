import styles from "./MarkerWidget.module.scss";
import MarkerIconSvg from "@res/svg/marker.svg";
import {JSX, Show, createEffect, createMemo, createSignal, on} from "solid-js";
import {assetToSrc} from "@feature/app/utiliy";
import {EntityWidget} from "@feature/entity/widget";
import {useStoreContext} from "@feature/store/context";
import {Icon} from "@shared/widget";
import {useViewerContext} from "@feature/viewer/context";
import {Marker} from "@feature/marker/type";
import {Prop} from "@feature/prop/type";
import {VIEWER_MODE} from "@feature/viewer/enum";

type Props = {
    entity: Marker;
};

export function MarkerWidget({entity}: Props): JSX.Element {
    const storeCtx = useStoreContext();
    const viewerCtx = useViewerContext();

    let element: HTMLDivElement | undefined;

    const transform = createMemo((): string => {
        const x = entity.x * viewerCtx.state.scale;
        const y = entity.y * viewerCtx.state.scale;

        return `translate3d(${x}px, ${y}px, 0px)`;
    });

    const style = createMemo((): JSX.CSSProperties => {
        return {
            transform: "translate3d(-50%, -50%, 0)",
            width: entity.width + "px",
            height: entity.height + "px",
        };
    });

    const prop = createMemo((): Prop | undefined => {
        const propId = entity.propId;

        return propId
            ? storeCtx.store.asset.getById<Prop>(propId)
            : undefined;
    });

    const [show, setShow] = createSignal(false);

    const hideListener = (event: PointerEvent): void => {
        if (
            event.target instanceof Element
            && !element?.contains(event.target)
        ) {
            setShow(false);
        }
    };

    createEffect(on(show, (value) => {
        if (value) {
            window.addEventListener("pointerdown", hideListener);
        }
        else {
            window.removeEventListener("pointerdown", hideListener);
        }
    }, {defer: true}));

    function handleClick(): void {
        setShow(true);

        viewerCtx.viewport?.focus(entity.x, entity.y);
    }

    return (
        <div
            class={styles.MarkerWidget}
            data-entity-id={entity.id}
            style={{transform: transform()}}
            draggable={false}
            ref={element}
        >
            <div
                class={styles.Marker}
                style={style()}
                onMouseDown={handleClick}
                onTouchStart={handleClick}
            >
                <Show
                    when={prop()}
                    fallback={(
                        <Icon
                            svg={MarkerIconSvg}
                            class={styles.Prop}
                        />
                    )}
                >
                    {(propMemo) => {
                        const prop = propMemo();

                        const src = prop.path
                            ? viewerCtx.path + prop.path
                            : assetToSrc(prop);

                        return (
                            <img
                                class={styles.Prop}
                                src={src}
                                draggable={false}
                            />
                        );
                    }}
                </Show>
            </div>

            <Show when={show() && entity.footnoteId}>
                {id => <EntityWidget entityId={id()}/>}
            </Show>
        </div>
    );
}