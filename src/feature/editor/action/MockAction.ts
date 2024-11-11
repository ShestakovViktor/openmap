import {Action} from "./Action";

export class MockAction extends Action {
    constructor(private store: string[]) {
        super();
    }

    execute(): void {
        this.store.push("Mock string");
    }

    cancel(): void {
        this.store.pop();
    }
}