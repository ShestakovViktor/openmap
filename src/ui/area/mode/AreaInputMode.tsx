import {Id, Layer, Footnote, Area} from "@type";
import {EntityFocusMode, UserInputMode} from "@ui/editor/mode";
import {ViewerContextType, useViewerContext} from "@ui/viewer/context";
import {ENTITY, LAYER, MOUSE} from "@enum";
import {pushAreaPoint} from "@ui/area/utility/pushAreaPoint";
import {StoreContextType, useStoreContext} from "@ui/app/context";
import {EditorContexType, useEditorContext} from "@ui/editor/context";

export class AreaInputMode extends UserInputMode {
    private storeCtx: StoreContextType;

    private viewerCtx: ViewerContextType;

    private editorCtx: EditorContexType;

    private areaId?: Id;

    constructor() {
        super();
        this.storeCtx = useStoreContext();
        this.viewerCtx = useViewerContext();
        this.editorCtx = useEditorContext();

    }

    initArea(): Id {
        const overlay = this.storeCtx.store.entity
            .getByParams<Layer>({name: LAYER.OVERLAY})[0];

        const areaId = this.storeCtx.store.entity.add<Area>({
            entityTypeId: ENTITY.AREA,
            x: 0,
            y: 0,
            width: 0,
            height: 0,
            points: [],
            parentId: overlay.id,
            footnoteId: null,
        });

        this.storeCtx.store.entity.set<Layer>({
            id: overlay.id,
            childIds: [...overlay.childIds, areaId],
        });

        const footnoteId = this.storeCtx.store.entity.add<Footnote>({
            entityTypeId: ENTITY.FOOTNOTE,
            text: "",
            figureIds: [],
            parentId: areaId,
        });

        this.storeCtx.store.entity.set<Area>({id: areaId, footnoteId});

        this.storeCtx.update.entity.set(overlay.id);

        return areaId;
    }

    onPointerDown(event: MouseEvent): void {
        event.stopPropagation();
        const canvas = this.viewerCtx.viewport.getCanvas();
        const rect = canvas.getBoundingClientRect();

        const click = {
            x: (event.x - rect.x)
                / this.viewerCtx.viewport.getScale(),
            y: (event.y - rect.y)
                / this.viewerCtx.viewport.getScale(),
        };

        if (event.buttons == MOUSE.LEFT) {
            if (!this.areaId) this.areaId = this.initArea();

            this.editorCtx.modes.area.form.set(this.areaId);

            const area = this.storeCtx.store.entity
                .getById<Area>(this.areaId);

            if (!area) throw new Error();

            pushAreaPoint(area, click);

            this.storeCtx.store.entity.set(area);
            this.storeCtx.update.entity.set(this.areaId);
        }
        else if (event.buttons == MOUSE.RIGHT) {
            if (this.areaId) {
                const focusMode = new EntityFocusMode(this.areaId);
                this.editorCtx.entityFocus.set(focusMode);
                this.areaId = undefined;
            }
            this.editorCtx.modes.area.form.set(null);
        }
    }

    onPointerMove(event: PointerEvent): void {
        event.stopPropagation();
    }
}