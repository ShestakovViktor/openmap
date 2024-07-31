import styles from "./MarkerWidget.module.scss";
import MarkerIconSvg from "@res/svg/marker.svg";
import {Accessor, JSX, Show, createEffect, createMemo, createSignal, on} from "solid-js";
import {Marker, Prop} from "@type";
import {assetToSrc} from "@ui/app/utiliy";
import {EntityWidget} from "@ui/entity/widget";
import {useStoreContext} from "@ui/app/context";
import {useViewerContext} from "@ui/viewer/context";
import {Icon} from "@ui/widget";

type Props = {
    entity: Accessor<Marker>;
};

export function MarkerWidget({entity}: Props): JSX.Element {
    const {store} = useStoreContext();
    const {viewport} = useViewerContext();

    let element: HTMLDivElement | undefined;

    const transform = createMemo((): string => {
        const x = entity().x * viewport.getScale();
        const y = entity().y * viewport.getScale();
        return `translate3d(${x}px, ${y}px, 0px)`;
    });

    const style = createMemo((): JSX.CSSProperties => {
        return {
            transform: "translate3d(-50%, -50%, 0)",
            width: entity().width + "px",
            height: entity().height + "px",
        };
    });

    const asset = createMemo((): Prop | null => {
        const propId = entity().propId;

        return propId
            ? store.asset.getById<Prop>(propId)
            : null;
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

    return (
        <div
            class={styles.MarkerWidget}
            data-entity-id={entity().id}
            style={{transform: transform()}}
            draggable={false}
            ref={element}
        >
            <div
                class={styles.Marker}
                style={style()}
                onMouseDown={() => setShow(true)}
            >
                <Show
                    when={asset()}
                    fallback={(
                        <Icon
                            svg={MarkerIconSvg}
                            class={styles.Prop}
                        />
                    )}
                >
                    {(asset) => (
                        <img
                            class={styles.Prop}
                            src={asset().path || assetToSrc(asset())}
                            draggable={false}
                        />
                    )}
                </Show>
            </div>

            <Show when={show() && entity().footnoteId}>
                {id => <EntityWidget entityId={id()}/>}
            </Show>
        </div>
    );
}