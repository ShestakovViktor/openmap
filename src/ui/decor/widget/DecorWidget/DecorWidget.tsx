import styles from "./DecorWidget.module.scss";
import ImageIconSvg from "@res/svg/image.svg";
import {Accessor, JSX, Show, createMemo} from "solid-js";
import {useViewerContext} from "@ui/viewer/context";

import {Decor, Motion, Prop} from "@type";
import {assetToSrc} from "@ui/app/utiliy";
import {useStoreContext} from "@ui/app/context";
import {Icon} from "@ui/widget";

type Props = {
    entity: Accessor<Decor>;
};

export function DecorWidget(props: Props): JSX.Element {
    const {entity} = props;
    const {store} = useStoreContext();
    const {viewport} = useViewerContext();

    const transform = createMemo((): string => {
        const x = entity().x * viewport.getScale();
        const y = entity().y * viewport.getScale();
        return `translate3d(${x}px, ${y}px, 0px)`;
    });

    const asset = createMemo((): Prop | null => {
        const propId = entity().propId;

        return propId
            ? store.asset.getById<Prop>(propId)
            : null;
    });

    const motionStyle = createMemo((): string => {
        const motionId = entity().motionId;

        if (!motionId) {
            return "";
        }
        else {
            const motion = store.asset.getById<Motion>(motionId);

            if (!motion) throw new Error();

            return motion.class;
        }
    });

    return (
        <div
            class={styles.DecorWidget}
            data-entity-id={entity().id}
            style={{transform: transform()}}
        >
            <div
                class={styles.Decor}

            >
                <Show
                    when={asset()}
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
                    {(asset) => (
                        <img
                            class={styles.Prop}
                            classList={{
                                [motionStyle()]: Boolean(motionStyle()),
                            }}
                            src={asset().path || assetToSrc(asset())}
                            draggable={false}
                        />
                    )}
                </Show>
            </div>
        </div>
    );
}