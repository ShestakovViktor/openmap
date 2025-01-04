import styles from "./DecorWidget.module.scss";
import ImageIconSvg from "@res/svg/image.svg";
import {Accessor, JSX, Show, createMemo} from "solid-js";
import {useViewerContext} from "@feature/viewer/context";

import {assetToSrc} from "@feature/app/utiliy";
import {useStoreContext} from "@feature/store/context";
import {Icon} from "@shared/widget";
import {Decor} from "@feature/decor/type";
import {Motion} from "@feature/motion/type";
import {Prop} from "@feature/prop/type";

type Props = {
    entity: Accessor<Decor>;
};

export function DecorWidget(props: Props): JSX.Element {
    const {store} = useStoreContext();
    const viewerCtx = useViewerContext();
    const entity = props.entity();

    const transform = createMemo((): string => {
        const x = entity.x * viewerCtx.state.scale;
        const y = entity.y * viewerCtx.state.scale;

        return `translate3d(${x}px, ${y}px, 0px)`;
    });

    const propSrc = createMemo((): string | undefined => {
        const propId = entity.propId;

        if (!propId) return undefined;

        const prop = store.asset.getById<Prop>(propId);

        if (!prop) return undefined;

        const src = prop.path
            ? viewerCtx.path + prop.path
            : assetToSrc(prop);

        return src;
    });

    const motionClass = createMemo((): string | undefined => {
        const motionId = entity.motionId;

        if (!motionId) return undefined;

        const motion = store.asset.getById<Motion>(motionId);

        if (!motion) return undefined;

        return motion.class;
    });

    const classList = createMemo(() => {
        return {[motionClass() || ""]:  Boolean(motionClass())};
    });

    return (
        <div
            class={styles.DecorWidget}
            style={{transform: transform()}}
            data-entity-id={entity.id}
        >
            <div class={styles.Decor}>
                <Show
                    when={propSrc()}
                    fallback={(
                        <Icon
                            svg={ImageIconSvg}
                            class={styles.Prop}
                            classList={classList()}
                        />
                    )}
                >
                    {<img
                        class={styles.Prop}
                        classList={classList()}
                        src={propSrc()}
                        draggable={false}
                    />}
                </Show>
            </div>
        </div>
    );
}