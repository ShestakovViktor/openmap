import {ENTITY_TYPE} from "@feature/entity/enum";
import {Footnote} from "@feature/footnote/type";
import {Layer} from "@feature/layer/type";
import {Marker} from "@feature/marker/type";
import {Action} from "./Action";
import {StoreContextType} from "@feature/store/context";
import {EditorContexType} from "@feature/editor/context";
import {Parent} from "@feature/entity/type";

export class MarkerCreateAction extends Action<Marker> {
    private parentId?: number;

    private markerId?: number;

    private footnoteId?: number;

    constructor(
        private storeCtx: StoreContextType,
        private editorCtx: EditorContexType,
        private x: number,
        private y: number
    ) {
        super();
    }

    execute(): Marker {
        const storeCtx = this.storeCtx;

        const parent = this.editorCtx.layer();

        if (!parent) throw new Error();

        const marker = storeCtx.store.entity.add<Marker>({
            entityTypeId: ENTITY_TYPE.MARKER,
            x: this.x,
            y: this.y,
            width: 64,
            height: 64,
            propId: null,
            parentId: parent.id,
            footnoteId: null,
        });

        storeCtx.store.entity
            .set<Layer>(parent.id, {childIds: [...parent.childIds, marker.id]});

        const footnote = storeCtx.store.entity.add<Footnote>({
            entityTypeId: ENTITY_TYPE.FOOTNOTE,
            text: "",
            figureIds: [],
            parentId: marker.id,
        });

        storeCtx.store.entity
            .set<Marker>(marker.id, {footnoteId: footnote.id});

        this.parentId = parent.id;
        this.markerId = marker.id;
        this.footnoteId = footnote.id;

        return marker;
    }

    revert(): void {
        this.editorCtx.setSelected(undefined);

        if (this.parentId && this.markerId) {
            const parent = this.storeCtx.store.entity
                .getById<Parent>(this.parentId);
            if (!parent) throw new Error();

            this.storeCtx.store.entity.set<Parent>(this.parentId, {
                childIds: parent.childIds
                    .filter(childId => childId != this.markerId),
            });
        }

        if (this.footnoteId) {
            this.storeCtx.store.entity.del(this.footnoteId);
        }

        if (this.markerId) {
            this.storeCtx.store.entity.del(this.markerId);
        }
    }
}