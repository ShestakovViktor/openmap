import {ViewerContextType, useViewerContext} from "@feature/viewer/context";
import {MOUSE} from "@enum";
import {pushAreaPoint} from "@feature/area/utility/pushAreaPoint";
import {StoreContextType, useStoreContext} from "@feature/store/context";
import {EditorContexType, useEditorContext} from "@feature/editor/context";
import {InputMode} from "./InputMode";
import {UI_MODE} from "@feature/editor/enum";
import {Area} from "@feature/area/type/Area";
import {Parent} from "@feature/entity/type";
import {Footnote} from "@feature/footnote/type/Footnote";
import {ENTITY_TYPE} from "@feature/entity/enum";

export class AreaCreate extends InputMode {
    private storeCtx: StoreContextType;

    private viewerCtx: ViewerContextType;

    private editorCtx: EditorContexType;

    constructor() {
        super();
        this.storeCtx = useStoreContext();
        this.viewerCtx = useViewerContext();
        this.editorCtx = useEditorContext();
    }

    initArea(x: number, y: number): Area {
        const {store} = this.storeCtx;

        const parent = this.editorCtx.layer();
        if (!parent) throw new Error();

        const area = store.entity.add<Area>({
            entityTypeId: ENTITY_TYPE.AREA,
            x,
            y,
            width: 0,
            height: 0,
            points: [{x: 0, y: 0}],
            parentId: parent.id,
            footnoteId: null,
        });

        store.entity
            .set<Parent>(parent.id, {childIds: [...parent.childIds, area.id]});

        const footnote = store.entity.add<Footnote>({
            entityTypeId: ENTITY_TYPE.FOOTNOTE,
            text: "",
            figureIds: [],
            parentId: area.id,
        });

        store.entity.set<Area>(area.id, {footnoteId: footnote.id});

        return area;
    }

    onMouseDown(event: MouseEvent): void {
        event.stopPropagation();

        const editorCtx = this.editorCtx;
        const {state} = this.viewerCtx;

        const x = Math.floor((event.x - state.x) / state.scale);
        const y = Math.floor((event.y - state.y) / state.scale);
        const click = {x, y};

        if (event.buttons == MOUSE.LEFT) {

            const selected = editorCtx.selected();
            if (
                !selected
                || selected.entityTypeId != ENTITY_TYPE.AREA
            ) {
                editorCtx.setSelected(this.initArea(x, y));
            }
            else {
                const area = selected as Area;

                const res = pushAreaPoint(area, click);

                this.storeCtx.store.entity.set<Area>(area.id, res);
            }

            editorCtx.setState({dockArea: {items: [UI_MODE.ENTITY_FORM]}});

            event.preventDefault();
        }
        else if (event.buttons == MOUSE.RIGHT) {
            editorCtx.setSelected(undefined);
        }
    }

    onMouseMove(event: PointerEvent): void {
        event.stopPropagation();
    }
}