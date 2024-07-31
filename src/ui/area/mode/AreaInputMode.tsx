import {Id, Layer, Footnote, Area} from "@type";
import {EntityFocusMode, UserInputMode} from "@ui/editor/mode";
import {ViewerContextType, useViewerContext} from "@ui/viewer/context";
import {ENTITY, LAYER, MOUSE} from "@enum";
import {pushAreaPoint} from "@ui/area/utility/pushAreaPoint";
import {SignalContextType, StoreContextType, useSignalContext, useStoreContext} from "@ui/app/context";
import {EditorContexType, useEditorContext} from "@ui/editor/context";

export class AreaInputMode extends UserInputMode {
    private storeCtx: StoreContextType;

    private signalCtx: SignalContextType;

    private viewerCtx: ViewerContextType;

    private editorCtx: EditorContexType;

    private areaId?: Id;

    constructor() {
        super();
        this.storeCtx = useStoreContext();
        this.signalCtx = useSignalContext();
        this.viewerCtx = useViewerContext();
        this.editorCtx = useEditorContext();
    }

    initArea(): Id {
        const {store} = this.storeCtx;
        const {signal} = this.signalCtx;

        const overlay = store.entity
            .getByParams<Layer>({name: LAYER.OVERLAY})[0];

        const area = store.entity.create<Area>({
            entityTypeId: ENTITY.AREA,
            x: 0,
            y: 0,
            width: 0,
            height: 0,
            points: [],
            parentId: overlay.id,
            footnoteId: null,
        });

        overlay.childIds.push(area.id);

        const footnote = store.entity.create<Footnote>({
            entityTypeId: ENTITY.FOOTNOTE,
            text: "",
            figureIds: [],
            parentId: area.id,
        });

        area.footnoteId = footnote.id;

        signal.entity.setUpdateById(overlay.id);

        return area.id;
    }

    onMouseDown(event: MouseEvent): void {
        event.stopPropagation();
        const {signal} = this.signalCtx;
        const {viewport} = this.viewerCtx;

        const canvas = viewport.getCanvas();
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

            signal.entity.setUpdateById(this.areaId);
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

    onMouseMove(event: PointerEvent): void {
        event.stopPropagation();
    }
}