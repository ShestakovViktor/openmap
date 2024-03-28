import {Asset, Decor} from "@type";
import {Modal} from "@ui/widget";
import {Mode} from "@ui/editor/utility";
import {ViewerContextType, useViewerContext} from "@ui/viewer/context";
import {AddEntityAction} from "@core/action";
import {EditorContexType, useEditorContext} from "@ui/editor/context";
import {MODAL_ID} from "@ui/editor/widget";
import {DecorCreateDialog} from "@ui/decor/widget";
import {EntityType, LayerName} from "@enum";

export class DecorMode implements Mode {
    private click: [number, number] = [0, 0];

    private createMarkerModal: Modal;

    private viewerCtx: ViewerContextType;

    private editorCtx: EditorContexType;

    constructor() {
        this.viewerCtx = useViewerContext();
        this.editorCtx = useEditorContext();

        this.createMarkerModal = new Modal("#" + MODAL_ID);
        this.createMarkerModal.render(
            <DecorCreateDialog
                onClose={() => this.createMarkerModal.hide()}
                onSubmit={(evt) => {
                    this.onDecorCreateSubmit(evt);
                }}
            />
        );
    }

    onDecorCreateSubmit(event: SubmitEvent): void {
        event.preventDefault();

        const form = event.target as HTMLFormElement;
        const formData = new FormData(form);
        form.reset();

        const assetId = Number(formData.get("assetId"));
        const motionId = Number(formData.get("motionId"));

        const {id: typeId} = this.viewerCtx.store.type
            .getByParams({name: EntityType.DECOR})[0];

        const decorData: Omit<Decor, "id"> = {
            typeId,
            x: this.click[0],
            y: this.click[1],
            assetId,
            motionId,
        };

        const {id: layerId} = this.viewerCtx.store.entity
            .getByParams({name: LayerName.OVERLAY})[0];

        if (!layerId) throw new Error("There is no overlay layer");
        const addEntityAction = new AddEntityAction(
            this.viewerCtx.store,
            decorData,
            layerId
        );

        this.editorCtx.core.invoker.execute(addEntityAction);
        this.viewerCtx.reRender();
        this.createMarkerModal.hide();

    }

    onMouseClick(event: MouseEvent): void {
        const scale = this.viewerCtx.mapCtx.scale;

        const root = document.querySelector("#viewer");
        if (!root) throw new Error();
        const rootBCR = root.getBoundingClientRect();

        this.click = [
            (event.x - rootBCR.x - this.viewerCtx.mapCtx.x) / scale,
            (event.y - rootBCR.y - this.viewerCtx.mapCtx.y) / scale,
        ];
        this.createMarkerModal.show();
    }
}