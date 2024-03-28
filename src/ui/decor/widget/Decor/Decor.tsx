import styles from "./Decor.module.scss";
import {JSXElement, createSignal} from "solid-js";
import {useViewerContext} from "@ui/viewer/context";

import {
    Decor as DecorData,
    Asset,
    Id,
    Motion,
} from "@type";

type Props = {
    entityId: Id;
};

export function Decor(props: Props): JSXElement {
    const viewerCtx = useViewerContext();
    const decor = viewerCtx.store.entity.getById<DecorData>(props.entityId);
    const asset = viewerCtx.store.entity.getById<Asset>(decor.assetId);
    const source = viewerCtx.store.source.getById(asset.sourceId);
    const motion = viewerCtx.store.entity.getById<Motion>(decor.motionId);

    const [show, setShow] = createSignal(false);

    let info: HTMLDivElement;

    return (
        <div
            class={styles.Decor}
            style={{
                transform: `translate3d(
                    ${decor.x * viewerCtx.mapCtx.scale + "px"}, 
                    ${decor.y * viewerCtx.mapCtx.scale + "px"},
                    0
                )`,
            }}
        >
            <img
                class={motion.class}
                src={source.path || source.content}
                onclick={(event) => {
                    setShow(true);

                    window.addEventListener("pointerdown", (event) => {
                        if (!info.contains(event.target as HTMLElement)) {
                            setShow(false);
                        }
                    });

                    event.stopPropagation();
                }}
            />
        </div>
    );
}