import {Input} from "@ui/editor/mode";
import {ViewerContextType, useViewerContext} from "@ui/viewer/context";
import {EditorContexType, useEditorContext} from "@ui/editor/context";
import {Group, Id, Marker} from "@type";
import {ENTITY, LAYER} from "@enum";

export class MarkerMode extends Input {
    private viewerCtx: ViewerContextType;

    private editorCtx: EditorContexType;

    constructor() {
        super();
        this.viewerCtx = useViewerContext();
        this.editorCtx = useEditorContext();
    }

    initMarker({x, y}: {x: number; y: number}): Id {
        const {id: typeId} = this.editorCtx.store.type
            .getByParams({name: ENTITY.MARKER})[0];

        const markerId = this.editorCtx.store.entity.add<Marker>({
            typeId,
            x,
            y,
            propId: null,
            text: "",
            graphicIds: [],
        });

        const overlay = this.editorCtx.store.entity
            .getByParams<Group>({name: LAYER.OVERLAY})[0];

        overlay.childIds.push(markerId);

        this.editorCtx.store.entity.set(overlay);

        return markerId;
    }

    onPointerDown(event: MouseEvent): void {
        const click = {
            x: (event.x - this.viewerCtx.mapCtx.x)
                / this.viewerCtx.mapCtx.scale,
            y: (event.y - this.viewerCtx.mapCtx.y)
                / this.viewerCtx.mapCtx.scale,
        };

        const markerId = this.initMarker(click);

        this.viewerCtx.reRender();

        this.editorCtx.formMode?.set("marker", markerId);

        this.editorCtx.focusMode?.set(markerId);
    }
}