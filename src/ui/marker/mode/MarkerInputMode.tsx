import {EntityFocusMode, UserInputMode} from "@ui/editor/mode";
import {ViewerContextType, useViewerContext} from "@ui/viewer/context";
import {EditorContexType, useEditorContext} from "@ui/editor/context";
import {Id, Layer, Footnote, Marker} from "@type";
import {ENTITY, LAYER} from "@enum";
import {StoreContextType, useStoreContext} from "@ui/app/context";

export class MarkerInputMode extends UserInputMode {
    private storeCtx: StoreContextType;

    private viewerCtx: ViewerContextType;

    private editorCtx: EditorContexType;

    constructor() {
        super();
        this.storeCtx = useStoreContext();
        this.viewerCtx = useViewerContext();
        this.editorCtx = useEditorContext();
    }

    initMarker({x, y}: {x: number; y: number}): Id {
        const overlay = this.storeCtx.store.entity
            .getByParams<Layer>({name: LAYER.OVERLAY})[0];

        const markerId = this.storeCtx.store.entity.add<Marker>({
            entityTypeId: ENTITY.MARKER,
            x,
            y,
            width: 64,
            height: 64,
            propId: null,
            parentId: overlay.id,
            footnoteId: null,
        });

        this.storeCtx.store.entity.set<Layer>({
            id: overlay.id,
            childIds: [...overlay.childIds, markerId],
        });

        const footnoteId = this.storeCtx.store.entity.add<Footnote>({
            entityTypeId: ENTITY.FOOTNOTE,
            text: "",
            figureIds: [],
            parentId: markerId,
        });

        this.storeCtx.store.entity.set<Marker>({id: markerId, footnoteId});

        this.storeCtx.update.entity.set(overlay.id);

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

        this.editorCtx.modes.marker.form.set(entityId);

        const focusMode = new EntityFocusMode(entityId);
        this.editorCtx.entityFocus.set(focusMode);
    }
}