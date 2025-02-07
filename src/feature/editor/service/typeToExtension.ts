import {media} from "@shared/data";

export function typeToExtension(type: string): string | undefined {
    return media
        .find((content) => content.type == type)?.extension;
}
