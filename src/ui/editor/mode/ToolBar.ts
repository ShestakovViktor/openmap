import {ToolBarMode} from "./ToolBarMode";

export class ToolBar {
    private activeModes: ToolBarMode[] = [];

    set(newMode: ToolBarMode): void {
        this.activeModes.forEach(mode => {
            if (mode != newMode) mode.hide();
        });
        newMode.show();
        this.activeModes = [newMode];
    }

    add(mode: ToolBarMode): void {
        if (this.activeModes.includes(mode)) return;
        mode.show();
        this.activeModes.push(mode);
    }

    clear(): void {
        this.activeModes.forEach(mode => mode.hide());
        this.activeModes = [];
    }
}