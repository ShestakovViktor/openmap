import styles from "./Viewer.module.scss";
import {
    JSX,
    For,
    Show,
    createEffect,
    createResource,
    on,
    onMount,
    Suspense,
} from "solid-js";

import {useViewerContext} from "@ui/viewer/context";
import {Viewport} from "@ui/viewer/utility";
import {EntityWidget} from "@ui/entity/widget";
import {ASSET} from "@enum";
import {Portal} from "solid-js/web";
import {assetToSrc} from "@ui/app/utiliy";
import {Entity} from "@type";

export const VIEWER_ID = "viewer";

export function Viewer(): JSX.Element {
    const viewerCtx = useViewerContext();
    let viewerEl: HTMLDivElement;

    const [root, {refetch: refetchRoot}] = createResource(
        () => viewerCtx.store.entity.getByParams<Entity>({name:"root"})[0]
    );

    const [motions, {refetch}] = createResource(
        () => viewerCtx.store.asset.getByParams({assetTypeId: ASSET.MOTION}),
        {initialValue: []}
    );

    createEffect(on(viewerCtx.prepare, refetch, {defer: true}));

    createEffect(on(viewerCtx.init, refetchRoot, {defer: true}));

    createEffect(on(viewerCtx.init, () => {
        const {value: width} = viewerCtx.store.config
            .getByParams({name: "width"})[0];
        const {value: height} = viewerCtx.store.config
            .getByParams({name: "height"})[0];

        viewerCtx.setLayout({
            x: 0,
            y: 0,
            width: Number(width),
            height: Number(height),
            scale: 1,
        });
    }, {defer: true}));

    onMount((): void => {
        const viewport = new Viewport(viewerEl);
        viewerEl.addEventListener(
            "pointerdown",
            (e) => viewport.onPointerDown(e)
        );
        viewerEl.addEventListener(
            "pointermove",
            (e) => viewport.onPointerMove(e)
        );
        viewerEl.addEventListener(
            "pointerup",
            (e) => viewport.onPointerUp(e)
        );
        viewerEl.addEventListener(
            "pointerleave",
            (e) => viewport.onPointerLeave(e)
        );
        viewerEl.addEventListener(
            "pointercancel",
            (e) => viewport.onPointerCancel()
        );
        viewerEl.addEventListener(
            "wheel",
            (e) => viewport.onWheel(e)
        );
    });

    return (
        <div id={VIEWER_ID} class={styles.Viewer} ref={viewerEl!}>
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
    );
}