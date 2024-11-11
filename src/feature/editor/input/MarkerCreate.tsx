import {InputMode} from "@feature/editor/input";
import {ViewerContextType, useViewerContext} from "@feature/viewer/context";
import {EditorContexType, useEditorContext} from "@feature/editor/context";
import {StoreContextType, useStoreContext} from "@feature/store/context";
import {ENTITY_TYPE} from "@feature/entity/enum";
import {UI_MODE} from "@feature/editor/enum";
import {Footnote} from "@feature/footnote/type";
import {Layer} from "@feature/layer/type";
import {Marker} from "@feature/marker/type";

export class MarkerCreate extends InputMode {
    private storeCtx: StoreContextType;

    private viewerCtx: ViewerContextType;

    private editorCtx: EditorContexType;

    constructor() {
        super();
        this.storeCtx = useStoreContext();
        this.viewerCtx = useViewerContext();
        this.editorCtx = useEditorContext();
    }

    onMouseDown(event: MouseEvent): void {
        const x = Math.floor(
            (event.x - this.viewerCtx.state.x) / this.viewerCtx.state.scale
        );
        const y = Math.floor(
            (event.y - this.viewerCtx.state.y) / this.viewerCtx.state.scale
        );

        const marker = this.initEntity(x, y);

        this.editorCtx.setSelected(marker);
        this.editorCtx.setState({
            dockArea: {items: [UI_MODE.ENTITY_FORM]},
        });

        event.preventDefault();
    }

    initEntity(x: number, y: number): Marker {
        const {store} = this.storeCtx;

        const parent = this.editorCtx.layer();

        if (!parent) throw new Error();

        const marker = store.entity.add<Marker>({
            entityTypeId: ENTITY_TYPE.MARKER,
            x,
            y,
            width: 64,
            height: 64,
            propId: null,
            parentId: parent.id,
            footnoteId: null,
        });

        store.entity
            .set<Layer>(parent.id, {childIds: [...parent.childIds, marker.id]});

        const footnote = store.entity.add<Footnote>({
            entityTypeId: ENTITY_TYPE.FOOTNOTE,
            text: "",
            figureIds: [],
            parentId: marker.id,
        });

        store.entity.set<Marker>(marker.id, {footnoteId: footnote.id});

        return marker;
    }
}