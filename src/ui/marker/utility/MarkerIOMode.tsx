import {IOMode} from "@ui/editor/utility";
import {ViewerContextType, useViewerContext} from "@ui/viewer/context";
import {EditorContexType, useEditorContext} from "@ui/editor/context";
import {createEffect, on} from "solid-js";
import {Group, Id, Marker} from "@type";
import {EntityType, LayerName} from "@enum";

export class MarkerIOMode implements IOMode {
    private viewerCtx: ViewerContextType;

    private editorCtx: EditorContexType;

    constructor() {
        this.viewerCtx = useViewerContext();
        this.editorCtx = useEditorContext();

        createEffect(on(this.editorCtx.getIOMode, (mode) => {
            if (mode instanceof MarkerIOMode) {
                this.editorCtx.formMode?.show("marker");
            }
        }));
    }

    initMarker({x, y}: {x: number; y: number}): Id {
        const {id: typeId} = this.editorCtx.store.type
            .getByParams({name: EntityType.MARKER})[0];

        const markerId = this.editorCtx.store.entity.add<Marker>({
            typeId,
            x,
            y,
            propId: null,
            text: "",
            graphicIds: [],
        });

        const overlay = this.editorCtx.store.entity
            .getByParams<Group>({name: LayerName.OVERLAY})[0];

        overlay.childrenIds.push(markerId);

        this.editorCtx.store.entity.set(overlay);

        return markerId;
    }

    onMouseClick(event: MouseEvent): void {
        const click = {
            x: (event.x - this.viewerCtx.mapCtx.x)
                / this.viewerCtx.mapCtx.scale,
            y: (event.y - this.viewerCtx.mapCtx.y)
                / this.viewerCtx.mapCtx.scale,
        };

        const markerId = this.initMarker(click);

        this.editorCtx.formMode?.show("marker", markerId);

        this.viewerCtx.reRender();

    }
}