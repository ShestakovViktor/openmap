import {UserInputMode} from "@ui/editor/mode";

export class UserInput {
    active: UserInputMode = new UserInputMode();

    set(mode: UserInputMode): void {
        this.active = mode;
    }
}