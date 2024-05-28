import {Id, Layer, Area} from "@type";
import {UserInputMode} from "@ui/editor/mode";
import {ViewerContextType, useViewerContext} from "@ui/viewer/context";
import {EditorContexType, useEditorContext} from "@ui/editor/context";
import {ENTITY, LAYER} from "@enum";
import {Accessor, Setter, createSignal} from "solid-js";
import {pushAreaPoint} from "@ui/area/utility/pushAreaPoint";

export class AreaInputMode extends UserInputMode {
    private getEntityId: Accessor<Id | undefined>;

    private setEntityId: Setter<Id | undefined>;

    private viewerCtx: ViewerContextType;

    private editorCtx: EditorContexType;

    constructor() {
        super();
        this.viewerCtx = useViewerContext();
        this.editorCtx = useEditorContext();

        const signal = createSignal<number>();
        [this.getEntityId, this.setEntityId] = signal;
    }

    initArea(): Id {
        const areaId = this.editorCtx.store.entity.add<Area>({
            entityTypeId: ENTITY.AREA,
            x: 0,
            y: 0,
            width: 0,
            height: 0,
            points: [],
            text: "",
            figureIds: [],
        });

        const overlay = this.editorCtx.store.entity
            .getByParams<Layer>({name: LAYER.OVERLAY})[0];

        overlay.childIds.push(areaId);

        this.editorCtx.store.entity.set(overlay);

        this.setEntityId(areaId);

        return areaId;
    }

    onPointerDown(event: MouseEvent): void {
        const click = {
            x: (event.x - this.viewerCtx.layout.x)
                / this.viewerCtx.layout.scale,
            y: (event.y - this.viewerCtx.layout.y)
                / this.viewerCtx.layout.scale,
        };

        let entityId = this.getEntityId();

        if (!entityId) entityId = this.initArea();

        // this.editorCtx.formMode?.set(ENTITY.AREA.id, areaId);

        const area = this.editorCtx.store.entity
            .getById<Area>(entityId);

        if (!area) throw new Error();

        pushAreaPoint(area, click);

        this.viewerCtx.reRender();

        this.editorCtx.store.entity.set(area);

        // this.editorCtx.focusMode[1]((prev) => {
        //     prev.forEach(entity => entity.clear());
        //     return [new FocusMode(entityId)];
        // });
    }
}