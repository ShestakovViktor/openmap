import {WebImageDriver} from "@feature/editor/driver";
import {initData} from "@feature/editor/service";
import {Parent} from "@feature/entity/type";
import {Layer} from "@feature/layer/type";
import {Store} from "@feature/store";
import {Tile} from "@feature/tile/type";
import {Data} from "@type";
import {Image} from "@feature/asset/type";
import {ASSET_TYPE} from "@feature/asset/enum/ASSET_TYPE";
import {ENTITY_TYPE} from "@feature/entity/enum/ENTITY_TYPE";

export async function initProject(params: {
    name: string;
    map: File;
}): Promise<Data> {
    const imageDriver = new WebImageDriver();

    const mime = "image/jpeg";
    const {width, height, tiles: imageTiles} = await imageDriver
        .initImage(params.map, mime);

    const data = initData({
        config: {
            1: {id: 1, name: "name", value: params.name},
            2: {id: 2, name: "width", value: width},
            3: {id: 3, name: "height", value: height},
        },
    });

    const store = new Store(data);

    const parent = store.entity.getById<Layer>(2);

    if (!parent) throw new Error();

    const tileIds: number[] = [];

    imageTiles.forEach((imageTile, index) => {
        const image = store.asset.add<Image>({
            assetTypeId: ASSET_TYPE.IMAGE,
            name: `tile ${index + 1}`,
            data: imageTile.data,
            media: imageTile.media,
            encoding: imageTile.encoding,
            path: "",
            size: imageTile.size,
        });

        const tile = store.entity.add<Tile>({
            entityTypeId: ENTITY_TYPE.TILE,
            x: imageTile.x,
            y: imageTile.y,
            width: imageTile.width,
            height: imageTile.height,
            parentId: parent.id,
            imageId: image.id,
        });

        tileIds.push(tile.id);
    });

    store.entity
        .set<Parent>(parent.id, {childIds: [...parent.childIds, ...tileIds]});

    return store.extract();
}