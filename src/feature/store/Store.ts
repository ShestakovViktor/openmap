import {Entity} from "@feature/entity/type";
import {Data, Param} from "@type";
import {Collection} from "./utility";
import {createStore, unwrap} from "solid-js/store";
import {Asset} from "@feature/asset/type";

export class Store {

    data: Data;

    config: Collection<Param>;

    entity: Collection<Entity>;

    asset: Collection<Asset>;

    constructor(input: Data) {
        const [data] = createStore(input);

        this.data = data;

        this.config = new Collection<Param>(data.config);

        this.entity = new Collection<Entity>(data.entity);

        this.asset = new Collection<Asset>(data.asset);
    }

    extract(): Data {
        return unwrap(this.data);
    }
}