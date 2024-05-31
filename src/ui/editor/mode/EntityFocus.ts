import {EntityFocusMode} from "@ui/editor/mode";

export class EntityFocus {
    private active: EntityFocusMode[] = [];

    get(): EntityFocusMode[] {
        return this.active;
    }

    set(mode: EntityFocusMode): void {
        if (this.active.includes(mode)) return;
        this.active.forEach((mode) => mode.unfocus());
        mode.focus();
        this.active = [mode];
    }

    add(mode: EntityFocusMode): void {
        if (this.active.includes(mode)) return;
        mode.focus();
        this.active.push(mode);
    }

    clear(): void {
        this.active.forEach(mode => mode.unfocus());
        this.active = [];
    }
}