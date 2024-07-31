import {ViewerContextType, useViewerContext} from "@ui/viewer/context";
import {EditorContexType, useEditorContext} from "@ui/editor/context";
import {ENTITY, LAYER} from "@enum";
import {Decor, Layer} from "@type";
import {EntityFocusMode, UserInputMode} from "@ui/editor/mode";
import {
    SignalContextType,
    StoreContextType,
    useSignalContext,
    useStoreContext,
} from "@ui/app/context";

export class DecorInputMode extends UserInputMode{
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

    initEntity({x, y}: {x: number; y: number}): number {
        const {store} = this.storeCtx;
        const {signal} = this.signalCtx;

        const overlay = store.entity
            .getByParams<Layer>({name: LAYER.OVERLAY})[0];

        const decor = store.entity.create<Decor>({
            entityTypeId: ENTITY.DECOR,
            x,
            y,
            width: 64,
            height: 64,
            propId: null,
            motionId: null,
            parentId: overlay.id,
        });

        overlay.childIds.push(decor.id);

        signal.entity.setUpdateById(overlay.id);

        return decor.id;
    }

    onMouseDown(event: MouseEvent): void {
        const {viewport} = this.viewerCtx;

        const canvas = viewport.getCanvas();
        const rect = canvas.getBoundingClientRect();

        const click = {
            x: (event.x - rect.x)
                / this.viewerCtx.viewport.getScale(),
            y: (event.y - rect.y)
                / this.viewerCtx.viewport.getScale(),
        };

        const entityId = this.initEntity(click);

        this.editorCtx.modes.decor.form.set(entityId);

        const focusMode = new EntityFocusMode(entityId);
        this.editorCtx.entityFocus.set(focusMode);
    }
}