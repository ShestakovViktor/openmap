import {ViewerContextType, useViewerContext} from "@ui/viewer/context";
import {EditorContexType, useEditorContext} from "@ui/editor/context";
import {ENTITY, LAYER} from "@enum";
import {Decor, Layer} from "@type";
import {EntityFocusMode, UserInputMode} from "@ui/editor/mode";

export class DecorInputMode extends UserInputMode{
    private viewerCtx: ViewerContextType;

    private editorCtx: EditorContexType;

    constructor() {
        super();
        this.viewerCtx = useViewerContext();
        this.editorCtx = useEditorContext();
    }

    initEntity({x, y}: {x: number; y: number}): number {
        const decorId = this.editorCtx.store.entity.add<Decor>({
            entityTypeId: ENTITY.DECOR,
            x,
            y,
            width: 64,
            height: 64,
            propId: null,
            motionId: null,
        });

        const overlay = this.editorCtx.store.entity
            .getByParams<Layer>({name: LAYER.OVERLAY})[0];

        overlay.childIds.push(decorId);

        this.editorCtx.store.entity.set(overlay);

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

        this.viewerCtx.reRender();

        this.editorCtx.modes.decor.form.set(entityId);

        const focusMode = new EntityFocusMode(entityId);
        this.editorCtx.entityFocus.set(focusMode);
    }
}