import {Action} from "@feature/editor/action";

export class Invoker {

    private executed: Action<any>[] = [];

    private canceled: Action<any>[] = [];

    execute<T>(action: Action<T>): T {
        const result = action.execute();
        this.executed.push(action);
        this.canceled.length = 0;
        return result;
    }

    undo(): void {
        const action = this.executed.pop();
        if (!action) return;

        action.revert();
        this.canceled.push(action);
    }

    redo(): void {
        const action = this.canceled.pop();

        if (!action) return;

        action.execute();
        this.executed.push(action);
    }
}