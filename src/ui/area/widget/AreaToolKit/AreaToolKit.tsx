import styles from "./AreaToolbar.module.scss";

import {Button, Toolbar} from "@ui/widget";
import en from "./string/en.json";

import i18next from "i18next";
import {JSX, Signal, createSignal} from "solid-js";
import {Area, Id} from "@type";
import {useEditorContext} from "@ui/editor/context";
import {useViewerContext} from "@ui/viewer/context";
import {popAreaPoint} from "@ui/area/utility";

i18next.addResourceBundle("en", "area", {AreaToolbar: en}, true, true);

export function AreaToolKit(): JSX.Element {
    // const editorCtx = useEditorContext();
    // const viewerCtx = useViewerContext();

    // const [getAreaId] = props.entityId
    //     ?? createSignal<Id | null>();

    // function deleteLastPoint(): void {
    //     const areaId = getAreaId();
    //     if (!areaId) return;

    //     const area = editorCtx.store.entity.getById<Area>(areaId);
    //     if (!area) throw new Error();

    //     popAreaPoint(area);
    //     editorCtx.store.entity.set(area);
    //     viewerCtx.reRender();
    // }

    return (
        <Toolbar>
            <Button
            />
        </Toolbar>
    );
}