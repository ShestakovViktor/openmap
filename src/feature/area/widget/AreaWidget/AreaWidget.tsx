import styles from "./AreaWidget.module.scss";
import {JSX, createSignal, createMemo, Show, Accessor} from "solid-js";
import {useViewerContext} from "@feature/viewer/context";
import {EntityWidget} from "@feature/entity/widget";
import {VIEWER_MODE} from "@feature/viewer/enum";
import {Area} from "@feature/area/type";

type Props = {
    entity: Accessor<Area>;
};

export function AreaWidget(props: Props): JSX.Element {
    const viewerCtx = useViewerContext();
    let area!: HTMLDivElement;
    let footnote!: HTMLDivElement;

    const [getShowArea, setShowArea] = createSignal(false);

    const factor = createMemo((): number => 5 / viewerCtx.state.scale);

    const transform = createMemo((): string => {
        const x = props.entity().x * viewerCtx.state.scale;
        const y = props.entity().y * viewerCtx.state.scale;
        const scale = viewerCtx.state.scale;

        return `translate3d(${x}px, ${y}px, 0px) scale(${scale})`;
    });

    const style = createMemo((): JSX.CSSProperties => {
        return {
            width: props.entity().width + factor() * 2 + "px",
            height: props.entity().height + factor() * 2 + "px",
        };
    });

    const viewBox = createMemo((): string => {
        const x = -props.entity().width / 2 - factor();
        const y = -props.entity().height / 2 - factor();
        const width = props.entity().width + factor() * 2;
        const height = props.entity().height + factor() * 2;

        return `${x} ${y} ${width} ${height}`;
    });

    function handleAreaMouseEnter(): void {
        setShowArea(true);
    }

    function handleAreaMouseLeave(event: MouseEvent): void {
        const relatedTarget = event.relatedTarget as HTMLElement;
        if (!footnote.contains(relatedTarget)) {
            setShowArea(false);
        }
    }

    function handleFootnoteMouseLeave(event: MouseEvent): void {
        const relatedTarget = event.relatedTarget as HTMLElement;
        if (!area.contains(relatedTarget)){
            setShowArea(false);
        }
    }

    const polygon = createMemo((): JSX.Element => {
        const points = props.entity().points
            .reduce((r, p) => r + ` ${p.x},${p.y}`, "");

        const fill = viewerCtx.state.mode == VIEWER_MODE.DEVELOPMENT
            ? "#0003"
            : "#0000";

        return (
            <polygon
                fill={fill}
                points={points}
                onMouseEnter={handleAreaMouseEnter}
                onMouseLeave={handleAreaMouseLeave}
            />
        );
    });

    const helpers = createMemo((): JSX.Element[] => {
        if (viewerCtx.state.mode == VIEWER_MODE.DEVELOPMENT) {
            return props.entity().points
                .map((point) =>
                    <circle
                        cx={point.x}
                        cy={point.y}
                        r={factor()}
                        fill="#000f"
                    />
                );
        }
        else {
            return [];
        }
    });

    return (
        <div
            class={styles.AreaWidget}
            data-entity-id={props.entity().id}
            style={{transform: transform()}}
            ref={area}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox={viewBox()}
                width={style().width}
                height={style().height}
            >
                {polygon()}
                {helpers()}
            </svg>

            <Show when={getShowArea() && props.entity().footnoteId}>
                {id =>
                    <EntityWidget
                        ref={footnote}
                        entityId={id()}
                        onMouseLeave={handleFootnoteMouseLeave}
                    />
                }
            </Show>
        </div>
    );
}