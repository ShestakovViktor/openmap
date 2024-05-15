import {MOUSE} from "@enum";
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

    private move(event: PointerEvent): void {
        const x = event.x - this.viewerCtx.layout.x;
        const y = event.y - this.viewerCtx.layout.y;

        if (this.selected) {
            this.selected.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        }
    }

    onPointerMove(event: PointerEvent): void {
        this.move(event);
    }

    onPointerUp(event: PointerEvent): void {

        if (this.selected) {
            const id = Number(this.selected.getAttribute("data-id"));
            const entity = this.editorCtx.store.entity.getById<Marker>(id);

            if (!entity) throw new Error();

            const x = (event.x - this.viewerCtx.layout.x)
                / this.viewerCtx.layout.scale;
            const y = (event.y - this.viewerCtx.layout.y)
                / this.viewerCtx.layout.scale;

            entity.x = Math.floor(x);
            entity.y = Math.floor(y);

            this.editorCtx.store.entity.set(entity);
            this.editorCtx.formMode?.upd();
            this.viewerCtx.reRender();
        }

        this.selected = null;
    }

    onPointerDown(event: MouseEvent): void {
        if (event.buttons != MOUSE.LEFT) return;
        const selected = getEntity(event.target as HTMLElement);

        if (!selected) {
            this.editorCtx.focusMode?.clear();
        }
        else {
            event.stopImmediatePropagation();
            this.selected = selected;

            const type = String(selected.getAttribute("data-type"));
            const id = Number(selected.getAttribute("data-id"));

            if (event.shiftKey) {
                this.editorCtx.focusMode?.add(id);
            }
            else {
                this.editorCtx.focusMode?.set(id);
            }
            this.editorCtx.formMode?.set(type, id);
        }
    }
}