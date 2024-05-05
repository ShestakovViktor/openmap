import styles from "./Motion.module.scss";
import {JSX, createResource} from "solid-js";
import {Motion, Id, Asset} from "@type";
import {useViewerContext} from "@ui/viewer/context";
import {Portal} from "solid-js/web";
import {Entity} from "@ui/entity/widget";

type Props = {
    entityId: Id;
};

export function MotionWidget(props: Props): JSX.Element {
    const viewerCtx = useViewerContext();

    const [asset] = createResource(
        () => viewerCtx.store.asset
            .getById<Motion>(props.entityId)
    );

    const href = (): string => {
        const motion = asset();
        if (!motion) return "";
        else {
            return motion.path || motion.content;
        }
    };

    return (
        <Portal mount={document.querySelector("head")!}>
            <link href={href()} rel="stylesheet"/>
        </Portal>
    );
}