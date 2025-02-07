import {InputMode} from "@feature/editor/input";
import {ViewerContextType, useViewerContext} from "@feature/viewer/context";
import {EditorContexType, useEditorContext} from "@feature/editor/context";
import {StoreContextType, useStoreContext} from "@feature/store/context";
import {UI_MODE} from "@feature/editor/enum";
import {CreateMarkerAction} from "@feature/marker/action";

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

        const marker = this.editorCtx.invoker.execute(
            new CreateMarkerAction(this.storeCtx, this.editorCtx, x, y)
        );

        this.editorCtx.setSelected(marker);
        this.editorCtx.setState({dockArea: {items: [UI_MODE.ENTITY_FORM]}});

        event.preventDefault();
    }
}