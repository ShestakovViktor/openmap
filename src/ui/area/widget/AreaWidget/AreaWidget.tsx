import styles from "./AreaWidget.module.scss";
import {
    JSX,
    Show,
    Suspense,
    createSignal,
    createResource,
    createEffect,
    on,
} from "solid-js";
import {useViewerContext} from "@ui/viewer/context";
import {Id, Area} from "@type";

type Props = {
    entityId: Id;
};

export function AreaWidget(props: Props): JSX.Element {
    const viewerCtx = useViewerContext();
    const [show, setShow] = createSignal(false);

    const [area, {refetch}] = createResource(() => viewerCtx.store.entity
        .getById<Area>(props.entityId));

    createEffect(on(viewerCtx.render, refetch));

    const factor = (): number => 5 / viewerCtx.mapCtx.scale;

    const x = (): string => {
        const data = area();
        return (data ? data.x * viewerCtx.mapCtx.scale : 0) + "px";
    };

    const y = (): string => {
        const data = area();
        return (data ? data.y * viewerCtx.mapCtx.scale : 0) + "px";
    };

    const width = (): string => {
        const data = area();
        return (data ? data.width * viewerCtx.mapCtx.scale : 0) + "px";
    };

    const height = (): string => {
        const data = area();
        return (data ? data.height * viewerCtx.mapCtx.scale : 0) + "px";
    };

    const viewBox = (): string => {
        const data = area();

        if (data) {
            const x = -data.width / 2;
            const y = -data.height / 2;
            const width = data.width;
            const height = data.height;

            return `${x - factor()} ${y - factor()} ${width + factor() * 2} ${height + factor() * 2}`;
        }
        else {
            return "0 0 0 0";
        }
    };

    const polygon = (): JSX.Element => {
        const data = area();
        const points = data
            ? data.points.reduce((r, p) => r + ` ${p.x},${p.y}`, "")
            : "";

        return (
            <polygon
                fill="#0003"
                points={points}
                onMouseEnter={() => {
                    setShow(true);
                }}
                onMouseLeave={() => {
                    setShow(false);
                }}
            />
        );
    };

    const helpers = (): JSX.Element[] => {
        const data = area();
        return data
            ? data.points.map((point) =>
                <circle
                    cx={point.x}
                    cy={point.y}
                    r={factor()}
                    fill="#000f"
                />
            )
            : [];
    };

    return (
        <Suspense>
            <div
                class={styles.AreaWidget}
                data-id={area()?.id}
                data-type={"area"}
                style={{transform: `translate3d(${x()}, ${y()}, 0)`}}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox={viewBox()}
                    width={width()}
                    height={height()}
                >
                    {polygon()}
                    {helpers()}
                </svg>

                <Show when={show()}>
                    <div class={styles.Info}>
                        <p class={styles.Text}>{area()?.text}</p>
                        {/* <Show when={entity.graphicIds.length}>
                        <img
                            class={styles.Graphic}
                            src={
                                viewerCtx.store.source
                                    .getById(entity.graphicIds[0]).content
                            }
                        />
                    </Show> */}
                    </div>
                </Show>
            </div>
        </Suspense>
    );
}