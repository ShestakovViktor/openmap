import {Action} from "@core/action";
import {Entity, Group, Id} from "@src/type";
import {Store} from "@core";

export class AddEntityAction extends Action {
    constructor(
        private store: Store,
        private data: Omit<Entity, "id">,
        private parentId: Id
    ) {
        super();
    }

    execute(): void {
        const entityId = this.store.entity.add(this.data);
        const parent = this.store.entity.getById<Group>(this.parentId);
        // parent.childrenIds.push(entityId);
        // this.store.entity.set<Group>(parent);
    }
}