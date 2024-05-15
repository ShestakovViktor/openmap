import styles from "./Viewer.module.scss";
import {For, JSX, createEffect, createResource, createSignal, on, onMount} from "solid-js";

import {useViewerContext} from "@ui/viewer/context";
import {Viewport} from "@ui/viewer/utility";
import {Entity} from "@ui/entity/widget";
import {ASSET} from "@enum";
import {Portal} from "solid-js/web";
import {assetToSrc} from "@ui/app/utiliy";

export const VIEWER_ID = "viewer";

export function Viewer(): JSX.Element {
    const viewerCtx = useViewerContext();
    let viewerEl: HTMLDivElement;

    const [rootId, setRootId] = createSignal(
        viewerCtx.store.entity.getByParams({name:"root"})[0].id,
        {equals: false}
    );

    const [motions, {refetch}] = createResource(() => {
        const {id: motionTypeId} = viewerCtx.store.type
            .getByParams({name: ASSET.MOTION})[0];

        const motions = viewerCtx.store.asset
            .getByParams({typeId: motionTypeId});

        return motions;
    });

    createEffect(on(viewerCtx.prepare, refetch));

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

        const {id: rootId} = viewerCtx.store.entity
            .getByParams({name:"root"})[0];

        if (!rootId) throw new Error();
        setRootId(rootId);
    }));

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
            <Entity entityId={rootId()} ref={(el) => viewerCtx.setRoot(el)} />
        </div>
    );
}