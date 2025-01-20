import styles from "./Viewer.module.scss";
import {JSX, createMemo, Show, For, createEffect} from "solid-js";
import {Portal} from "solid-js/web";

import {useViewerContext} from "@feature/viewer/context";
import {Viewport} from "@feature/viewer/utility";
import {EntityWidget} from "@feature/entity/widget";
import {IDS} from "@enum";
import {useStoreContext} from "@feature/store/context";
import {assetToSrc} from "@feature/app/utiliy";
import {Param} from "@type";
import {ASSET_TYPE} from "@feature/asset/enum";

export function Viewer(): JSX.Element {
    const storeCtx = useStoreContext();
    const viewerCtx = useViewerContext();

    const root = createMemo(() => {
        return storeCtx.store.entity.getById(1);
    });

    const motions = createMemo(() => {
        return storeCtx.store.asset
            .getByParams({assetTypeId: ASSET_TYPE.MOTION});
    });

    function onViewerMount(viewer: HTMLElement): void {
        viewerCtx.viewport = new Viewport(viewer);
    }

    return (
        <div id={IDS.VIEWER} class={styles.Viewer} ref={onViewerMount} draggable="false">
            <For each={motions()}>
                {(motion) => {
                    const href = motion.path
                        ? viewerCtx.path + motion.path
                        : assetToSrc(motion);

                    return (
                        <Portal mount={document.querySelector("head")!}>
                            <link href={href} rel="stylesheet"/>
                        </Portal>
                    );
                }}
            </For>

            <Show when={root()}>
                {(root) => <EntityWidget entityId={root().id}/>}
            </Show>
        </div>
    );
}