import styles from "./MarkerWidget.module.scss";
import MarkerIconSvg from "@res/svg/marker.svg";
import {Accessor, JSX, Show, createEffect, createMemo, createSignal, on} from "solid-js";
import {assetToSrc} from "@feature/app/utiliy";
import {EntityWidget} from "@feature/entity/widget";
import {useStoreContext} from "@feature/store/context";
import {Icon} from "@shared/widget";
import {useViewerContext} from "@feature/viewer/context";
import {Marker} from "@feature/marker/type";
import {Prop} from "@feature/prop/type";

type Props = {
    entity: Accessor<Marker>;
};

export function MarkerWidget(props: Props): JSX.Element {
    const storeCtx = useStoreContext();
    const viewerCtx = useViewerContext();

    let element: HTMLDivElement | undefined;

    const transform = createMemo((): string => {
        const x = props.entity().x * viewerCtx.state.scale;
        const y = props.entity().y * viewerCtx.state.scale;

        return `translate3d(${x}px, ${y}px, 0px)`;
    });

    const style = createMemo((): JSX.CSSProperties => {
        return {
            transform: "translate3d(-50%, -50%, 0)",
            width: props.entity().width + "px",
            height: props.entity().height + "px",
        };
    });

    const propSrc = createMemo((): string | undefined => {
        const propId = props.entity().propId;

        if (!propId) return undefined;

        const prop = storeCtx.store.asset.getById<Prop>(propId);

        if (!prop) return undefined;

        const src = prop.path
            ? viewerCtx.path + prop.path
            : assetToSrc(prop);

        return src;
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

        viewerCtx.viewport?.focus(props.entity().x, props.entity().y);
    }

    return (
        <div
            class={styles.MarkerWidget}
            data-entity-id={props.entity().id}
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
                    when={propSrc()}
                    fallback={(
                        <Icon
                            svg={MarkerIconSvg}
                            class={styles.Prop}
                        />
                    )}
                >
                    {<img
                        class={styles.Prop}
                        src={propSrc()}
                        draggable={false}
                    />}
                </Show>
            </div>

            <Show when={show() && props.entity().footnoteId}>
                {id => <EntityWidget entityId={id()}/>}
            </Show>
        </div>
    );
}