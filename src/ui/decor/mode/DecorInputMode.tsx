import {ViewerContextType, useViewerContext} from "@ui/viewer/context";
import {EditorContexType, useEditorContext} from "@ui/editor/context";
import {ENTITY, LAYER} from "@enum";
import {Decor, Layer} from "@type";
import {EntityFocusMode, UserInputMode} from "@ui/editor/mode";
import {StoreContextType, useStoreContext} from "@ui/app/context";

export class DecorInputMode extends UserInputMode{
    private storeCtx: StoreContextType;

    private viewerCtx: ViewerContextType;

    private editorCtx: EditorContexType;

    constructor() {
        super();
        this.storeCtx = useStoreContext();
        this.viewerCtx = useViewerContext();
        this.editorCtx = useEditorContext();
    }

    initEntity({x, y}: {x: number; y: number}): number {
        const decorId = this.storeCtx.store.entity.add<Decor>({
            entityTypeId: ENTITY.DECOR,
            x,
            y,
            width: 64,
            height: 64,
            propId: null,
            motionId: null,
        });

        const overlay = this.storeCtx.store.entity
            .getByParams<Layer>({name: LAYER.OVERLAY})[0];

        overlay.childIds.push(decorId);

        this.storeCtx.store.entity.set(overlay);
        this.storeCtx.update.entity.set(overlay.id);

        return decorId;
    }

    onPointerDown(event: MouseEvent): void {
        const click = {
            x: (event.x - this.viewerCtx.layout.x)
                / this.viewerCtx.layout.scale,
            y: (event.y - this.viewerCtx.layout.y)
                / this.viewerCtx.layout.scale,
        };

        const entityId = this.initEntity(click);

        this.editorCtx.modes.decor.form.set(entityId);

        const focusMode = new EntityFocusMode(entityId);
        this.editorCtx.entityFocus.set(focusMode);
    }
}