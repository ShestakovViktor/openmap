import {Id, Layer, Footnote, Area} from "@type";
import {UserInputMode} from "@ui/editor/mode";
import {ViewerContextType, useViewerContext} from "@ui/viewer/context";
import {ENTITY, LAYER} from "@enum";
import {Accessor, Setter, createSignal} from "solid-js";
import {pushAreaPoint} from "@ui/area/utility/pushAreaPoint";
import {StoreContextType, useStoreContext} from "@ui/app/context";

export class AreaInputMode extends UserInputMode {
    private getEntityId: Accessor<Id | undefined>;

    private setEntityId: Setter<Id | undefined>;

    private storeCtx: StoreContextType;

    private viewerCtx: ViewerContextType;

    constructor() {
        super();
        this.storeCtx = useStoreContext();
        this.viewerCtx = useViewerContext();

        const signal = createSignal<number>();
        [this.getEntityId, this.setEntityId] = signal;
    }

    initArea(): Id {
        const footnoteId = this.storeCtx.store.entity.add<Footnote>({
            entityTypeId: ENTITY.FOOTNOTE,
            text: "",
            figureIds: [],
        });

        const areaId = this.storeCtx.store.entity.add<Area>({
            entityTypeId: ENTITY.AREA,
            x: 0,
            y: 0,
            width: 0,
            height: 0,
            points: [],
            footnoteId,
        });

        const overlay = this.storeCtx.store.entity
            .getByParams<Layer>({name: LAYER.OVERLAY})[0];

        overlay.childIds.push(areaId);

        this.storeCtx.store.entity.set(overlay);
        this.storeCtx.update.entity.set(overlay.id);

        this.setEntityId(areaId);

        return areaId;
    }

    onPointerDown(event: MouseEvent): void {
        const click = {
            x: (event.x - this.viewerCtx.layout.x)
                / this.viewerCtx.layout.scale,
            y: (event.y - this.viewerCtx.layout.y)
                / this.viewerCtx.layout.scale,
        };

        let entityId = this.getEntityId();

        if (!entityId) entityId = this.initArea();

        // this.editorCtx.formMode?.set(ENTITY.AREA.id, areaId);

        const area = this.storeCtx.store.entity
            .getById<Area>(entityId);

        if (!area) throw new Error();

        pushAreaPoint(area, click);

        this.storeCtx.store.entity.set(area);

        // this.editorCtx.focusMode[1]((prev) => {
        //     prev.forEach(entity => entity.clear());
        //     return [new FocusMode(entityId)];
        // });
    }
}