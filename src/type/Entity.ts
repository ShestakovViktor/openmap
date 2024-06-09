import {Id} from "./Id";

export type Entity = {
    id: Id;
    entityTypeId: Id;
    parentId: Id | null;
};