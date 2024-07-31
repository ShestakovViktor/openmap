import styles from "./Viewer.module.scss";
import {
    JSX,
    For,
    createEffect,
    createResource,
    on,
    onMount,
    Suspense,
} from "solid-js";

import {useViewerContext} from "@ui/viewer/context";
import {Viewport} from "@ui/viewer/utility";
import {EntityWidget} from "@ui/entity/widget";
import {ASSET, IDS} from "@enum";
import {Portal} from "solid-js/web";
import {assetToSrc} from "@ui/app/utiliy";
import {useSignalContext, useStoreContext} from "@ui/app/context";

export function Viewer(): JSX.Element {
    const {store} = useStoreContext();
    const {signal} = useSignalContext();
    const viewerCtx = useViewerContext();

    let viewer: HTMLDivElement;
    let canvas: HTMLDivElement;

    const [root, {refetch: refetchRoot}] = createResource(
        () => store.entity.getByParams({name:"root"})[0]
    );

    const [motions, {refetch: refetchAsset}] = createResource(
        () => store.asset.getByParams({assetTypeId: ASSET.MOTION}),
        {initialValue: []}
    );

    createEffect(on(signal.store.getInit, refetchRoot, {defer: true}));

    createEffect(on(signal.store.getInit, refetchAsset, {defer: true}));

    createEffect(on(signal.asset.getUpdateById, refetchAsset, {defer: true}));

    onMount((): void => {
        viewerCtx.viewport = new Viewport(viewer, canvas);
    });

    createEffect(on(signal.store.getInit, () => {
        const {value: width} = store.config.getByParams({name: "width"})[0];
        const {value: height} = store.config.getByParams({name: "height"})[0];

        canvas.style.width = width + "px";
        canvas.style.height = height + "px";

        viewerCtx.viewport.set(Number(width), Number(height));
    }));

    return (
        <div id={IDS.VIEWER} class={styles.Viewer} ref={viewer!} draggable="false">
            <div id={IDS.CANVAS} class={styles.Canvas} ref={canvas!} >
                <For each={motions()}>
                    {(motion) =>
                        <Portal mount={document.querySelector("head")!}>
                            <link href={assetToSrc(motion)} rel="stylesheet"/>
                        </Portal>
                    }
                </For>
                <Suspense>
                    <EntityWidget entityId={root()!.id}/>
                </Suspense>
            </div>
        </div>
    );
}