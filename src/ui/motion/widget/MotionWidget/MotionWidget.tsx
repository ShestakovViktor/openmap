import styles from "./Motion.module.scss";
import {JSX, Show, createSignal} from "solid-js";
import {Motion, Id} from "@type";
import {useViewerContext} from "@ui/viewer/context";
import {Portal} from "solid-js/web";

type Props = {
    entityId: Id;
};

export function MotionWidget(props: Props): JSX.Element {
    const viewerCtx = useViewerContext();
    const motion = viewerCtx.store.entity
        .getById<Motion>(props.entityId);

    const source = viewerCtx.store.source
        .getById(motion.sourceId);

    return (
        <Portal mount={document.querySelector("head")!}>
            <link href={source.path || source.content} rel="stylesheet"/>
        </Portal>
    );
}