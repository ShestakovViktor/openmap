import styles from "./DecorWidget.module.scss";
import ImageIconSvg from "@res/svg/image.svg";
import {JSX, Show, createMemo} from "solid-js";
import {useViewerContext} from "@feature/viewer/context";

import {assetToSrc} from "@feature/app/utiliy";
import {useStoreContext} from "@feature/store/context";
import {Icon} from "@shared/widget";
import {Decor} from "@feature/decor/type";
import {Motion} from "@feature/motion/type";
import {Prop} from "@feature/prop/type";

type Props = {
    entity: Decor;
};

export function DecorWidget({entity}: Props): JSX.Element {
    const storeCtx = useStoreContext();
    const viewerCtx = useViewerContext();

    const transform = createMemo((): string => {
        const x = entity.x * viewerCtx.state.scale;
        const y = entity.y * viewerCtx.state.scale;

        return `translate3d(${x}px, ${y}px, 0px)`;
    });

    const prop = createMemo((): Prop | undefined => {
        const propId = entity.propId;

        return propId
            ? storeCtx.store.asset.getById<Prop>(propId)
            : undefined;
    });

    const motionStyle = createMemo((): string => {
        const motionId = entity.motionId;

        return motionId
            ? storeCtx.store.asset.getById<Motion>(motionId)?.class || ""
            : "";
    });

    return (
        <div
            class={styles.DecorWidget}
            data-entity-id={entity.id}
            style={{transform: transform()}}
        >
            <div
                class={styles.Decor}

            >
                <Show
                    when={prop()}
                    fallback={(
                        <Icon
                            svg={ImageIconSvg}
                            class={styles.Prop}
                            classList={{
                                [motionStyle()]: Boolean(motionStyle()),
                            }}
                        />
                    )}
                >
                    {(propMemo) => {
                        const prop = propMemo();

                        const src = prop.path
                            ? viewerCtx.path + prop.path
                            : assetToSrc(prop);

                        return (<img
                            class={styles.Prop}
                            classList={{
                                [motionStyle()]: Boolean(motionStyle()),
                            }}
                            src={src}
                            draggable={false}
                        />);
                    }}
                </Show>
            </div>
        </div>
    );
}