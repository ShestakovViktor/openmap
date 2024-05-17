import styles from "./MarkerWidget.module.scss";
import {JSX, Show, Suspense, createEffect, createMemo, createSignal, on} from "solid-js";
import {Marker, Prop} from "@type";
import {useViewerContext} from "@ui/viewer/context";
import {assetToSrc} from "@ui/app/utiliy";
import {ENTITY} from "@enum";
import {updateEffect} from "@ui/viewer/utility";

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
            && prev.propId == next.propId
            && prev.text == next.text;
    };

    const [entity, setEntity] = createSignal<Marker>(props.entity, {equals});

    updateEffect(viewerCtx.render, fetchEntity, setEntity, props.entity.id);

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

    const [showInfo, setShowInfo] = createSignal(false);

    let info: HTMLDivElement;

    return (
        <Suspense>
            <div
                class={styles.MarkerWidget}
                data-id={entity().id}
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
                            setShowInfo(true);

                            window.addEventListener("pointerdown", (event) => {
                                if (!info.contains(event.target as HTMLElement)) {
                                    setShowInfo(false);
                                }
                            });

                            event.stopPropagation();
                        }}
                    />
                </div>

                <Show when={showInfo()}>
                    <div class={styles.Info} ref={info!}>
                        <p class={styles.Text}>{entity().text}</p>
                        {/* <Show when={data()?.graphicIds.length}>
                            <img
                                class={styles.Graphic}
                                src={
                                    viewerCtx.store.source
                                        .getById(data()?.graphicIds[0]).content
                                }
                            />
                        </Show> */}
                    </div>
                </Show>
            </div>
        </Suspense>
    );
}