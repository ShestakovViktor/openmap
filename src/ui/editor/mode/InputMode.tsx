import {Input} from "@ui/editor/mode";

export class InputMode {
    private inputs: {[key: string]: Input} = {};

    private current: Input;

    constructor() {
        this.current = new Input();
    }

    add(name: string, input: Input): void {
        this.inputs[name] = input;
    }

    set(name: string): void {
        this.current = this.inputs[name];
    }

    get(): Input {
        return this.current;
    }
}