import {Asset} from "@type";

export function assetToSrc(asset: Asset): string {
    return asset.path
        || `data:${asset.media};${asset.encoding},${asset.data}`;
}