import {Asset} from "@feature/asset/type";

export function assetToSrc(asset: Asset): string {
    return `data:${asset.media};${asset.encoding},${asset.data}`;
}