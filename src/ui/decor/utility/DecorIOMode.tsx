import {IOMode} from "@ui/editor/utility";
import {ViewerContextType, useViewerContext} from "@ui/viewer/context";
import {EditorContexType, useEditorContext} from "@ui/editor/context";
import {createEffect, on} from "solid-js";
import {EntityType, LayerName} from "@enum";
import {Decor, Group} from "@type";

export class DecorIOMode implements IOMode{
    private viewerCtx: ViewerContextType;

    private editorCtx: EditorContexType;

    constructor() {
        this.viewerCtx = useViewerContext();
        this.editorCtx = useEditorContext();

        createEffect(on(this.editorCtx.getIOMode, (mode) => {
            if (mode instanceof DecorIOMode) {
                this.editorCtx.formMode?.show("decor");
            }
        }));
    }

    initEntity({x, y}: {x: number; y: number}): number {
        const {id: typeId} = this.editorCtx.store.type
            .getByParams({name: EntityType.DECOR})[0];

        const decorId = this.editorCtx.store.entity.add<Decor>({
            typeId,
            x,
            y,
            propId: null,
            motionId: null,
        });

        const overlay = this.editorCtx.store.entity
            .getByParams<Group>({name: LayerName.OVERLAY})[0];

        overlay.childIds.push(decorId);

        this.editorCtx.store.entity.set(overlay);

        return decorId;
    }

    onMouseClick(event: MouseEvent): void {
        const click = {
            x: (event.x - this.viewerCtx.mapCtx.x)
                / this.viewerCtx.mapCtx.scale,
            y: (event.y - this.viewerCtx.mapCtx.y)
                / this.viewerCtx.mapCtx.scale,
        };

        const entityId = this.initEntity(click);

        this.editorCtx.formMode?.show("decor", entityId);

        this.viewerCtx.reRender();

        this.editorCtx.setSelected([entityId]);
    }
}