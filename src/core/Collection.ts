import {Id} from "@type";

export class Collection<U extends {id: Id}> {
    constructor(private data: {[key: Id]: U}) {}

    private genId(): Id {
        return Object.values(this.data).reduce((freeId, item) => {
            if (freeId <= item.id) freeId = item.id + 1;
            return freeId;
        }, 1);
    }

    // export function generateId(): string {
    //     return Date.now().toString(36)
    //         + Math.random().toString(36).substring(2, 12).padStart(12, "0");
    // }

    add<T extends U = U>(data: Omit<T, "id">): Id {
        const id = this.genId();
        this.data[id] = {...data, id} as T;
        return id;
    }

    set<T extends U = U>(data: Partial<T> & {id: Id}): void {
        Object.assign(this.data[data.id], data);
    }

    del(id: Id): void {
        delete this.data[id];
    }

    getById<T extends U = U>(id: Id): T | null {
        const entity = this.data[id] as T | undefined;
        return entity ? structuredClone(entity) : null;
    }

    getAll<T extends U = U>(): T[] {
        const result: T[] = [];
        for (const itemId in this.data) {
            const item = this.data[itemId];
            result.push(structuredClone(item) as T);
        }

        return result;
    }

    getByParams<T extends U = U>(params: {[key: string]: any}): T[] {
        const result: T[] = [];
        for (const itemId in this.data) {
            const item = this.data[itemId];

            for (const prop in params) {
                if (!(prop in item)) break;
                if (params[prop] == (item as any)[prop]) {
                    result.push(structuredClone(item) as T);
                }
            }
        }

        return result;
    }

}