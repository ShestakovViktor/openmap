import styles from "./MarkerWidget.module.scss";
import {JSX, createMemo, createSignal} from "solid-js";
import {Figure, Marker, Prop} from "@type";
import {useViewerContext} from "@ui/viewer/context";
import {assetToSrc} from "@ui/app/utiliy";
import {updateEffect} from "@ui/viewer/utility";
import {InfoPopup} from "@ui/viewer/widget";

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
            && prev.text == next.text
            && prev.figureIds == next.figureIds;
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

    const text = createMemo(() => entity().text);

    const figures = createMemo((): Figure[] => {
        return entity().figureIds.map((id) => {
            const figure = viewerCtx.store.asset.getById<Figure>(id);
            if (!figure) throw new Error();
            return figure;
        });
    });

    const [getInfoPopupState, setInfoPopupState] = createSignal(false);

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
                        setInfoPopupState(!getInfoPopupState());
                        event.stopPropagation();
                    }}
                />
            </div>

            <InfoPopup
                state={[getInfoPopupState, setInfoPopupState]}
                text={text()}
                figures={figures()}
            />
        </div>
    );
}