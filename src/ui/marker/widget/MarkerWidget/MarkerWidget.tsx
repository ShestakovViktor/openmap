import styles from "./MarkerWidget.module.scss";
import {JSX, Show, Suspense, createEffect, createResource, createSignal, on} from "solid-js";
import {Marker, Id, Prop} from "@type";
import {useViewerContext} from "@ui/viewer/context";
import {assetToSrc} from "@ui/app/utiliy";

type Props = {
    entityId: Id;
};

export function MarkerWidget(props: Props): JSX.Element {
    const viewerCtx = useViewerContext();

    const [entity, {refetch}] = createResource(() => viewerCtx.store.entity
        .getById<Marker>(props.entityId));

    createEffect(on(viewerCtx.render, refetch));

    const transform = (): string => {
        const data = entity();
        if (!data) {
            return "translate(0px, 0px, 0)";
        }
        else {
            const x = data.x * viewerCtx.layout.scale;
            const y = data.y * viewerCtx.layout.scale;
            return `translate3d(${x}px, ${y}px, 0px)`;
        }
    };

    const style = (): JSX.CSSProperties => {
        const data = entity();
        if (!data) {
            return {};
        }
        else {
            return {
                transform: "translate3d(-50%, -50%, 0)",
                width: data.width + "px",
                height: data.height + "px",
            };
        }
    };

    const src = (): string => {
        const propId = entity()?.propId;

        if (!propId) {
            return "./icon/marker.svg";
        }
        else {
            const asset = viewerCtx.store.asset
                .getById<Prop>(propId);

            if (!asset) throw new Error();

            return asset.path || assetToSrc(asset);
        }
    };

    const [showInfo, setShowInfo] = createSignal(false);

    let info: HTMLDivElement;

    return (
        <Suspense>
            <div
                class={styles.MarkerWidget}
                data-id={entity()?.id}
                data-type={"marker"}
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
                        <p class={styles.Text}>{entity()?.text}</p>
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