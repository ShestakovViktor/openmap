import {ViewerContextType, useViewerContext} from "@ui/viewer/context";
import {EditorContexType, useEditorContext} from "@ui/editor/context";
import {ENTITY, LAYER} from "@enum";
import {Decor, Group} from "@type";
import {Input} from "@ui/editor/mode";

export class DecorMode extends Input{
    private viewerCtx: ViewerContextType;

    private editorCtx: EditorContexType;

    constructor() {
        super();
        this.viewerCtx = useViewerContext();
        this.editorCtx = useEditorContext();
    }

    initEntity({x, y}: {x: number; y: number}): number {
        const {id: typeId} = this.editorCtx.store.type
            .getByParams({name: ENTITY.DECOR})[0];

        const decorId = this.editorCtx.store.entity.add<Decor>({
            typeId,
            x,
            y,
            propId: null,
            motionId: null,
        });

        const overlay = this.editorCtx.store.entity
            .getByParams<Group>({name: LAYER.OVERLAY})[0];

        overlay.childIds.push(decorId);

        this.editorCtx.store.entity.set(overlay);

        return decorId;
    }

    onPointerDown(event: MouseEvent): void {
        const click = {
            x: (event.x - this.viewerCtx.mapCtx.x)
                / this.viewerCtx.mapCtx.scale,
            y: (event.y - this.viewerCtx.mapCtx.y)
                / this.viewerCtx.mapCtx.scale,
        };

        const entityId = this.initEntity(click);

        this.viewerCtx.reRender();

        this.editorCtx.formMode?.set("decor", entityId);

        this.editorCtx.focusMode?.set(entityId);
    }
}