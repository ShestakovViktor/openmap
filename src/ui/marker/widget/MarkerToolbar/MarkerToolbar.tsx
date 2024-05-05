import styles from "./MarkerToolbar.module.scss";
import OkIconSvg from "@public/icon/ok.svg";
import NoIconSvg from "@public/icon/no.svg";

import {Button, Toolbar} from "@ui/widget";
import en from "./string/en.json";

import i18next from "i18next";
import {Accessor, JSX, Setter, createSignal} from "solid-js";
import {Group, Id} from "@type";
import {useEditorContext} from "@ui/editor/context";
import {LayerName} from "@enum";
import {useViewerContext} from "@ui/viewer/context";

i18next.addResourceBundle("en", "area", {MarkerToolbar: en}, true, true);

type Props = {
    signal?: [
        getId: Accessor<number | undefined>,
        setId: Setter<number | undefined>,
    ];
};

export function MarkerToolbar(props: Props): JSX.Element {
    const editorCtx = useEditorContext();
    const viewerCtx = useViewerContext();

    const [getId, setId] = props.signal ?? createSignal<Id | undefined>();

    function cancelMarker(): void {
        const markerId = getId();
        if (markerId) editorCtx.store.entity.del(markerId);

        const overlay = editorCtx.store.entity
            .getByParams<Group>({name: LayerName.OVERLAY})[0];

        overlay.childIds = overlay.childIds
            .filter(id => id != markerId);

        editorCtx.store.entity.set(overlay);

        setId(undefined);
        viewerCtx.reRender();
    }

    return (
        <Toolbar>
            <Button
                icon={NoIconSvg}
                onClick={() => {
                    cancelMarker();
                }}
            />
            <Button
                icon={OkIconSvg}
            />
        </Toolbar>
    );
}