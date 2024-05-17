import {Id} from "@type";
import {Input} from "@ui/editor/mode";

export class InputMode {
    private inputs: {[key: Id]: Input} = {};

    private current: Input;

    constructor() {
        this.current = new Input();
    }

    add(id: Id, input: Input): void {
        this.inputs[id] = input;
    }

    set(id: Id): void {
        this.current = this.inputs[id];
    }

    get(): Input {
        return this.current;
    }
}