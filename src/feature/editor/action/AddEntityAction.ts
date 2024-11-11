import {Action} from "./Action";

export class AddEntityAction extends Action {
    // constructor(
    //     private store: Store,
    //     private data: Omit<Entity, "id">,
    //     private parentId: Id
    // ) {
    //     super();
    // }

    execute(): void {
        // const entityId = this.store.entity.create(this.data);
        // const parent = this.store.entity.getById<Layer>(this.parentId);
        // parent.childrenIds.push(entityId);
        // this.store.entity.set<Group>(parent);
    }
}