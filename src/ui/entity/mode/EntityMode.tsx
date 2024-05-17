import {ENTITY, MOUSE} from "@enum";
import {Marker} from "@type";
import {EditorContexType, useEditorContext} from "@ui/editor/context";
import {Input} from "@ui/editor/mode";
import {getEntity} from "@ui/editor/utility";
import {ViewerContextType, useViewerContext} from "@ui/viewer/context";

export class EntityMode extends Input {
    private editorCtx: EditorContexType;

    private viewerCtx: ViewerContextType;

    private selected: HTMLElement | null = null;

    constructor() {
        super();
        this.editorCtx = useEditorContext();
        this.viewerCtx = useViewerContext();
    }

    onPointerMove(event: PointerEvent): void {
        const x = event.x - this.viewerCtx.layout.x;
        const y = event.y - this.viewerCtx.layout.y;

        if (this.selected) {
            const id = Number(this.selected.getAttribute("data-id"));
            const entity = this.editorCtx.store.entity.getById<Marker>(id);
            if (!entity) return;

            this.selected.style.transform = `translate3d(${x}px, ${y}px, 0)`;
            entity.x = Math.floor(x / this.viewerCtx.layout.scale);
            entity.y = Math.floor(y / this.viewerCtx.layout.scale);

            this.editorCtx.store.entity.set(entity);
            this.editorCtx.formMode?.upd();
            this.viewerCtx.reRender(id);
        }
    }

    onPointerUp(event: PointerEvent): void {
        this.selected = null;
    }

    onPointerDown(event: MouseEvent): void {
        if (event.buttons != MOUSE.LEFT) return;
        const selected = getEntity(event.target as HTMLElement);

        if (!selected) {
            this.editorCtx.focusMode?.clear();
        }
        else {
            const id = Number(selected.getAttribute("data-id"));

            const entity = this.editorCtx.store.entity.getById(id);

            if (!entity) throw new Error();

            if (![
                ENTITY.MARKER.id,
                ENTITY.DECOR.id,
                ENTITY.AREA.id,
            ].includes(entity.entityTypeId)) return;

            event.stopImmediatePropagation();
            this.selected = selected;

            if (event.shiftKey) {
                this.editorCtx.focusMode?.add(id);
            }
            else {
                this.editorCtx.focusMode?.set(id);
            }
            //this.editorCtx.formMode?.set(entity.entityTypeId, id);
        }
    }
}