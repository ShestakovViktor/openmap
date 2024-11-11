import styles from "./AreaWidget.module.scss";
import {JSX, createSignal, createMemo, Show} from "solid-js";
import {useViewerContext} from "@feature/viewer/context";
import {EntityWidget} from "@feature/entity/widget";
import {VIEWER_MODE} from "@feature/viewer/enum";
import {Area} from "@feature/area/type";

type Props = {
    entity: Area;
};

export function AreaWidget(props: Props): JSX.Element {
    const {entity} = props;
    const viewerCtx = useViewerContext();

    const [show, setShow] = createSignal(false);

    const factor = createMemo((): number => 5 / viewerCtx.state.scale);

    const transform = createMemo((): string => {
        const x = entity.x * viewerCtx.state.scale;
        const y = entity.y * viewerCtx.state.scale;
        const scale = viewerCtx.state.scale;

        return `translate3d(${x}px, ${y}px, 0px) scale(${scale})`;
    });

    const style = createMemo((): JSX.CSSProperties => {
        return {
            width: entity.width + factor() * 2 + "px",
            height: entity.height + factor() * 2 + "px",
        };
    });

    const viewBox = createMemo((): string => {
        const x = -entity.width / 2 - factor();
        const y = -entity.height / 2 - factor();
        const width = entity.width + factor() * 2;
        const height = entity.height + factor() * 2;

        return `${x} ${y} ${width} ${height}`;
    });

    const polygon = createMemo((): JSX.Element => {
        const points = entity.points
            .reduce((r, p) => r + ` ${p.x},${p.y}`, "");

        const fill = viewerCtx.state.mode == VIEWER_MODE.DEVELOPMENT
            ? "#0003"
            : "#0000";

        return (
            <polygon
                fill={fill}
                points={points}
                onMouseEnter={() => {
                    setShow(true);
                }}
                onMouseLeave={() => {
                    setShow(false);
                }}
            />
        );
    });

    const helpers = createMemo((): JSX.Element[] => {
        if (viewerCtx.state.mode == VIEWER_MODE.DEVELOPMENT) {
            return entity.points
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
            data-entity-id={entity.id}
            style={{transform: transform()}}
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

            <Show when={show() && entity.footnoteId}>
                {id => <EntityWidget entityId={id()}/>}
            </Show>
        </div>
    );
}