import {EntityFocusMode, UserInputMode} from "@ui/editor/mode";
import {ViewerContextType, useViewerContext} from "@ui/viewer/context";
import {EditorContexType, useEditorContext} from "@ui/editor/context";
import {Id, Layer, Footnote, Marker} from "@type";
import {ENTITY, LAYER} from "@enum";
import {
    SignalContextType,
    StoreContextType,
    useSignalContext,
    useStoreContext,
} from "@ui/app/context";

export class MarkerInputMode extends UserInputMode {
    private storeCtx: StoreContextType;

    private signalCtx: SignalContextType;

    private viewerCtx: ViewerContextType;

    private editorCtx: EditorContexType;

    constructor() {
        super();
        this.storeCtx = useStoreContext();
        this.signalCtx = useSignalContext();
        this.viewerCtx = useViewerContext();
        this.editorCtx = useEditorContext();
    }

    initMarker({x, y}: {x: number; y: number}): Id {
        const {store} = this.storeCtx;
        const {signal} = this.signalCtx;

        const overlay = store.entity
            .getByParams<Layer>({name: LAYER.OVERLAY})[0];

        const marker = store.entity.create<Marker>({
            entityTypeId: ENTITY.MARKER,
            x,
            y,
            width: 64,
            height: 64,
            propId: null,
            parentId: overlay.id,
            footnoteId: null,
        });

        overlay.childIds.push(marker.id);

        const footnote = store.entity.create<Footnote>({
            entityTypeId: ENTITY.FOOTNOTE,
            text: "",
            figureIds: [],
            parentId: marker.id,
        });

        marker.footnoteId = footnote.id;

        signal.entity.setUpdateById(overlay.id);

        return marker.id;
    }

    onMouseDown(event: MouseEvent): void {
        const canvas = this.viewerCtx.viewport.getCanvas();
        const rect = canvas.getBoundingClientRect();

        const click = {
            x: event.x - rect.x,
            y: event.y - rect.y,
        };

        const entityId = this.initMarker(click);

        this.editorCtx.modes.marker.form.set(entityId);

        const focusMode = new EntityFocusMode(entityId);
        this.editorCtx.entityFocus.set(focusMode);
    }
}