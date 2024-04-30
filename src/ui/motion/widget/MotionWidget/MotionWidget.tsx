import styles from "./Motion.module.scss";
import {JSX, createResource} from "solid-js";
import {Motion, Id, Source} from "@type";
import {useViewerContext} from "@ui/viewer/context";
import {Portal} from "solid-js/web";

type Props = {
    entityId: Id;
};

export function MotionWidget(props: Props): JSX.Element {
    const viewerCtx = useViewerContext();

    const [entity] = createResource(
        () => viewerCtx.store.entity
            .getById<Motion>(props.entityId)
    );

    const href = (): string => {
        const sourceId = entity()?.sourceId;

        if (!sourceId) {
            return "";
        }
        else {
            const source = viewerCtx.store.source
                .getById<Source>(sourceId);

            if (!source) throw new Error();

            return source.path || source.content;
        }

    };

    return (
        <Portal mount={document.querySelector("head")!}>
            <link href={href()} rel="stylesheet"/>
        </Portal>
    );
}