import {ViewerContextType, useViewerContext} from "@feature/viewer/context";
import {EditorContexType, useEditorContext} from "@feature/editor/context";
import {StoreContextType, useStoreContext} from "@feature/store/context";
import {ENTITY_TYPE} from "@feature/entity/enum";
import {InputMode} from "@feature/editor/input";
import {UI_MODE} from "@feature/editor/enum";
import {Parent} from "@feature/entity/type";
import {Layer} from "@feature/layer/type";
import {Decor} from "@feature/decor/type";

export class DecorCreate extends InputMode {
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
        const {state} = this.viewerCtx;

        const x = Math.floor((event.x - state.x) / state.scale);
        const y = Math.floor((event.y - state.y) / state.scale);

        const decor = this.initEntity(x, y);

        this.editorCtx.setSelected(decor);
        this.editorCtx.setState({
            dockArea: {items: [UI_MODE.ENTITY_FORM]},
        });

        event.preventDefault();
    }

    initEntity(x: number, y: number): Decor {
        const {store} = this.storeCtx;

        const parent = this.editorCtx.layer();

        if (!parent) throw new Error();

        const decor = store.entity.add<Decor>({
            entityTypeId: ENTITY_TYPE.DECOR,
            x,
            y,
            width: 64,
            height: 64,
            propId: null,
            motionId: null,
            parentId: parent.id,
        });

        store.entity.set<Layer>(
            parent.id,
            {childIds: [...parent.childIds, decor.id]}
        );

        return decor;
    }
}