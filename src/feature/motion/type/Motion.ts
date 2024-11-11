import {Asset} from "@feature/asset/type";

export type Motion = Asset & {
    name: string;
    class: string;
};