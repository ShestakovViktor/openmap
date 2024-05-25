import {EntityFocusMode, UserInputMode} from "@ui/editor/mode";
import {ViewerContextType, useViewerContext} from "@ui/viewer/context";
import {EditorContexType, useEditorContext} from "@ui/editor/context";
import {Id, Layer, Marker} from "@type";
import {ENTITY, LAYER} from "@enum";

export class MarkerInputMode extends UserInputMode {
    private viewerCtx: ViewerContextType;

    private editorCtx: EditorContexType;

    constructor() {
        super();
        this.viewerCtx = useViewerContext();
        this.editorCtx = useEditorContext();
    }

    initMarker({x, y}: {x: number; y: number}): Id {
        const markerId = this.editorCtx.store.entity.add<Marker>({
            entityTypeId: ENTITY.MARKER.id,
            x,
            y,
            width: 64,
            height: 64,
            propId: null,
            text: "",
            figureIds: [],
        });

        const overlay = this.editorCtx.store.entity
            .getByParams<Layer>({name: LAYER.OVERLAY})[0];

        overlay.childIds.push(markerId);

        this.editorCtx.store.entity.set(overlay);

        return markerId;
    }

    onPointerDown(event: MouseEvent): void {
        const click = {
            x: (event.x - this.viewerCtx.layout.x)
                / this.viewerCtx.layout.scale,
            y: (event.y - this.viewerCtx.layout.y)
                / this.viewerCtx.layout.scale,
        };

        const entityId = this.initMarker(click);

        this.viewerCtx.reRender();

        this.editorCtx.modes.marker.form.set(entityId);

        const focusMode = new EntityFocusMode(entityId);
        this.editorCtx.entityFocus.set(focusMode);
    }
}