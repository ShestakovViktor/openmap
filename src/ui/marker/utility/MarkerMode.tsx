import {Asset, Id, Marker} from "@src/type";

import {Modal} from "@ui/widget";
import {MarkerCreateDialog} from "@src/ui/marker/widget";
import {Mode} from "@ui/editor/utility";
import {ViewerContextType, useViewerContext} from "@ui/viewer/context";
import {AddEntityAction} from "@core/action";
import {EditorContexType, useEditorContext} from "@ui/editor/context";
import {blobToBase64} from "@src/util";
import {EntityType, LayerName} from "@enum";

export class MarkerMode implements Mode {
    private click: [number, number] = [0, 0];

    private createMarkerModal: Modal;

    private viewerCtx: ViewerContextType;

    private editorCtx: EditorContexType;

    constructor() {
        this.viewerCtx = useViewerContext();
        this.editorCtx = useEditorContext();

        this.createMarkerModal = new Modal("#modal");
        this.createMarkerModal.render(
            <MarkerCreateDialog
                onClose={() => this.createMarkerModal.hide()}
                onSubmit={(evt) => {
                    this.onMarkerCreateSubmit(evt)
                        .catch(err => {throw err;});
                }}
            />
        );
    }

    async onMarkerCreateSubmit(event: SubmitEvent): Promise<void> {
        event.preventDefault();

        const form = event.target as HTMLFormElement;
        const formData = new FormData(form);
        form.reset();

        const text = String(formData.get("text"));
        const assetId = Number(formData.get("assetId"));
        const graphic = formData.getAll("graphic") as File[];

        const files = graphic.filter((file) => file.size > 0);

        const strings = await Promise
            .all(files.map((file) => blobToBase64(file)));

        const graphicIds = strings.map((base64: string): Id => {
            return this.viewerCtx.store.source.add({
                content: base64,
                path: "",
                mime: "image/jpg",
            });
        });

        const asset = this.viewerCtx.store.entity.getById<Asset>(assetId);
        const {id: typeId} = this.viewerCtx.store.type
            .getByParams({name: EntityType.MARKER})[0];

        const markerData: Omit<Marker, "id"> = {
            typeId,
            x: this.click[0],
            y: this.click[1],
            assetId: asset.sourceId,
            text,
            graphicIds,
        };

        const {id: layerId} = this.viewerCtx.store.entity
            .getByParams({name: LayerName.OVERLAY})[0];

        if (!layerId) throw new Error("There is no overlay layer");
        const addEntityAction = new AddEntityAction(
            this.viewerCtx.store,
            markerData,
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