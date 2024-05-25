import {DockAreaMode} from "./DockAreaMode";

export class DockArea {
    private active: DockAreaMode[] = [];

    set(mode: DockAreaMode): void {
        if (this.active.includes(mode)) return;
        this.active.forEach((mode) => mode.hide());
        mode.show();
        this.active = [mode];
    }

    add(mode: DockAreaMode): void {
        if (this.active.includes(mode)) return;
        mode.show();
        this.active.push(mode);
    }

    clear(): void {
        this.active.forEach(mode => mode.hide());
        this.active = [];
    }
}