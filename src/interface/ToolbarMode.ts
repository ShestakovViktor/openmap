import {Id} from "@type";

export interface ToolbarMode {
    set(name?: string, id?: Id): void;
}