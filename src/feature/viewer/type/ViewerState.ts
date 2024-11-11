import {VIEWER_MODE} from "@feature/viewer/enum";

export type ViewerState = {
    mode: typeof VIEWER_MODE[keyof typeof VIEWER_MODE];
    x: number;
    y: number;
    scale: number;
};