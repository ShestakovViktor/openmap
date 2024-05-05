import {Area, Group, Id} from "@type";
import {IOMode} from "@ui/editor/utility";
import {ViewerContextType, useViewerContext} from "@ui/viewer/context";
import {EditorContexType, useEditorContext} from "@ui/editor/context";
import {EntityType, LayerName} from "@enum";
import {Accessor, Setter, createEffect, createSignal, on} from "solid-js";
import {pushAreaPoint} from "./pushAreaPoint";

export class AreaIOMode implements IOMode {
    private getEntityId: Accessor<Id | undefined>;

    private setEntityId: Setter<Id | undefined>;

    private viewerCtx: ViewerContextType;

    private editorCtx: EditorContexType;

    constructor() {
        this.viewerCtx = useViewerContext();
        this.editorCtx = useEditorContext();

        const signal = createSignal<number>();
        [this.getEntityId, this.setEntityId] = signal;

        createEffect(on(this.editorCtx.getIOMode, (mode) => {
            if (mode instanceof AreaIOMode) {
                this.editorCtx.formMode?.show("area");
                this.editorCtx.toolbarMode?.show("area");
            }
        }));
    }

    initArea(): Id {
        const {id: typeId} = this.editorCtx.store.type
            .getByParams({name: EntityType.AREA})[0];

        const areaId = this.editorCtx.store.entity.add<Area>({
            typeId,
            x: 0,
            y: 0,
            width: 0,
            height: 0,
            points: [],
            text: "",
            graphicIds: [],
        });

        const overlay = this.editorCtx.store.entity
            .getByParams<Group>({name: LayerName.OVERLAY})[0];

        overlay.childIds.push(areaId);

        this.editorCtx.store.entity.set(overlay);

        this.setEntityId(areaId);

        return areaId;
    }

    onMouseClick(event: MouseEvent): void {
        const click = {
            x: (event.x - this.viewerCtx.mapCtx.x)
                / this.viewerCtx.mapCtx.scale,
            y: (event.y - this.viewerCtx.mapCtx.y)
                / this.viewerCtx.mapCtx.scale,
        };

        let areaId = this.getEntityId();

        if (!areaId) areaId = this.initArea();

        this.editorCtx.formMode?.show("area", areaId);

        const area = this.editorCtx.store.entity
            .getById<Area>(areaId);

        if (!area) throw new Error();

        pushAreaPoint(area, click);

        this.editorCtx.store.entity.set(area);

        this.viewerCtx.reRender();

        this.editorCtx.setSelected([areaId]);
    }
}