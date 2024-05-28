import {ENTITY, MOUSE} from "@enum";
import {Entity, Marker} from "@type";
import {EditorContexType, useEditorContext} from "@ui/editor/context";
import {EntityFocusMode, UserInputMode} from "@ui/editor/mode";
import {ViewerContextType, useViewerContext} from "@ui/viewer/context";

export class EntityInputMode extends UserInputMode {
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
            const id = Number(this.selected.getAttribute("data-entity-id"));
            const entity = this.editorCtx.store.entity.getById<Marker>(id);
            if (!entity) return;

            this.selected.style.transform = `translate3d(${x}px, ${y}px, 0)`;
            entity.x = Math.floor(x / this.viewerCtx.layout.scale);
            entity.y = Math.floor(y / this.viewerCtx.layout.scale);

            this.editorCtx.store.entity.set(entity);
            // this.editorCtx.formMode?.upd();
            this.viewerCtx.reRender(id);
        }
    }

    onPointerUp(event: PointerEvent): void {
        this.selected = null;
    }

    onPointerDown(event: MouseEvent): void {
        if (event.buttons != MOUSE.LEFT) return;
        const entityFocus = new EntityFocusMode(event.target as HTMLElement);

        if (!entityFocus.element || !entityFocus.entityId) {
            this.editorCtx.entityFocus.clear();
            this.editorCtx.dockArea.clear();
            this.editorCtx.toolBar.set(this.editorCtx.modes.entity.toolbar);
            return;
        }

        const entity = this.editorCtx.store.entity
            .getById<Entity>(entityFocus.entityId);

        if (!entity) throw new Error();

        if (![
            ENTITY.MARKER,
            ENTITY.DECOR,
            ENTITY.AREA,
        ].includes(entity.entityTypeId)) {
            this.editorCtx.entityFocus.clear();
            this.editorCtx.dockArea.clear();
            this.editorCtx.toolBar.set(this.editorCtx.modes.entity.toolbar);
            return;
        }

        event.stopImmediatePropagation();
        this.selected = entityFocus.element;

        if (event.shiftKey) {
            this.editorCtx.entityFocus.add(entityFocus);
        }
        else {
            this.editorCtx.entityFocus.set(entityFocus);
        }

        if (entity.entityTypeId == ENTITY.MARKER) {
            const {
                form: markerForm,
                toolbar: markerToolbar,
            } = this.editorCtx.modes.marker;

            const {
                toolbar: entityToolbar,
            } = this.editorCtx.modes.entity;

            markerForm.set(entity.id);
            this.editorCtx.dockArea.set(markerForm);
            this.editorCtx.toolBar.set(entityToolbar);
            this.editorCtx.toolBar.add(markerToolbar);
        }
        else if (entity.entityTypeId == ENTITY.DECOR) {
            const {
                form: decorForm,
            } = this.editorCtx.modes.decor;

            const {
                toolbar: entityToolbar,
            } = this.editorCtx.modes.entity;

            decorForm.set(entity.id);
            this.editorCtx.dockArea.set(decorForm);
            this.editorCtx.toolBar.set(entityToolbar);
        }
        else if (entity.entityTypeId == ENTITY.AREA) {
            const {
                form: areaForm,
            } = this.editorCtx.modes.area;

            const {
                toolbar: entityToolbar,
            } = this.editorCtx.modes.entity;

            areaForm.set(entity.id);
            this.editorCtx.dockArea.set(areaForm);
            this.editorCtx.toolBar.set(entityToolbar);
        }
    }
}