export class Action<T> {
    execute(): T {
        throw new Error("implement me");
    }

    revert(): void {
        throw new Error("implement me");
    }
}