import {Id} from "@type";

export interface FormMode {
    set(name: string, id?: Id): void;
}