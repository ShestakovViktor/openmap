import {ToolKitMode} from "./ToolKitMode";

export class ToolKit {
    private activeModes: ToolKitMode[] = [];

    set(newMode: ToolKitMode): void {
        this.activeModes.forEach(mode => {
            if (mode != newMode) mode.hide();
        });
        newMode.show();
        this.activeModes = [newMode];
    }

    add(mode: ToolKitMode): void {
        if (this.activeModes.includes(mode)) return;
        mode.show();
        this.activeModes.push(mode);
    }

    clear(): void {
        this.activeModes.forEach(mode => mode.hide());
        this.activeModes = [];
    }
}