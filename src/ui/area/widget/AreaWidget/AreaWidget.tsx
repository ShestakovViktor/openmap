import styles from "./AreaWidget.module.scss";
import {JSX, createSignal, createMemo, Show, Accessor} from "solid-js";
import {useViewerContext} from "@ui/viewer/context";
import {Area} from "@type";
import {EntityWidget} from "@ui/entity/widget";

type Props = {
    entity: Accessor<Area>;
};

export function AreaWidget(props: Props): JSX.Element {
    const {entity} = props;
    const {viewport} = useViewerContext();

    const [show, setShow] = createSignal(false);

    const factor = createMemo((): number => 5 / viewport.getScale());

    const transform = createMemo((): string => {
        const x = entity().x * viewport.getScale();
        const y = entity().y * viewport.getScale();
        return `translate3d(${x}px, ${y}px, 0px)`;
    });

    const width = createMemo((): string => {
        return entity().width * viewport.getScale() + "px";
    });

    const height = createMemo((): string => {
        return entity().height * viewport.getScale() + "px";
    });

    const viewBox = createMemo((): string => {
        const x = -entity().width / 2 - factor();
        const y = -entity().height / 2 - factor();
        const width = entity().width + factor() * 2;
        const height = entity().height + factor() * 2;

        return `${x} ${y} ${width} ${height}`;
    });

    const polygon = createMemo((): JSX.Element => {
        const points = entity().points
            .reduce((r, p) => r + ` ${p.x},${p.y}`, "");

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
    });

    const helpers = createMemo((): JSX.Element[] => {
        return entity().points
            .map((point) =>
                <circle
                    cx={point.x}
                    cy={point.y}
                    r={factor()}
                    fill="#000f"
                />
            );
    });

    return (
        <div
            class={styles.AreaWidget}
            data-entity-id={entity().id}
            style={{transform: transform()}}
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

            <Show when={show() && entity().footnoteId}>
                {id => <EntityWidget entityId={id()}/>}
            </Show>
        </div>
    );
}