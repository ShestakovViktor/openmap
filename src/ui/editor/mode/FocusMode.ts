import {Id} from "@type";

export class FocusMode {
    private selected: Id[] = [];

    set(id: Id): void {
        this.selected.forEach((id) => {
            const el = document.querySelector(`[data-id="${id}"`);
            if (el) el.classList.remove("Selected");
        });

        this.selected = [id];

        const el = document.querySelector(`[data-id="${id}"`);
        if (el) el.classList.add("Selected");
    }

    add(id: Id): void {
        this.selected.push(id);

        const el = document.querySelector(`[data-id="${id}"`);
        if (el) el.classList.add("Selected");
    }

    clear(): void {
        this.selected.forEach((id) => {
            const el = document.querySelector(`[data-id="${id}"`);
            if (el) el.classList.remove("Selected");
        });

        this.selected = [];
    }
}