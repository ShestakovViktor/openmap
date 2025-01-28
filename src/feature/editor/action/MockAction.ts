import {Action} from "./Action";

export class MockAction extends Action<void> {
    constructor(private store: string[]) {
        super();
    }

    execute(): void {
        this.store.push("Mock string");
    }

    revert(): void {
        this.store.pop();
    }
}