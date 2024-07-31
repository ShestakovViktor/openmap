import {Data, Entity, Type, Asset, Param} from "@type";
import {Catalog} from "@core";

export class Store {
    private data!: Data;

    public config!: Catalog<Param>;

    public asset!: Catalog<Asset>;

    public assetType!: Catalog<Type>;

    public entity!: Catalog<Entity>;

    public entityType!: Catalog<Type>;

    setData(data: Data): void {
        this.data = data;
        this.config = new Catalog<Param>(this.data.config);
        this.asset = new Catalog<Asset>(this.data.asset);
        this.assetType = new Catalog<Type>(this.data.assetType);
        this.entity = new Catalog<Entity>(this.data.entity);
        this.entityType = new Catalog<Type>(this.data.entityType);
    }

    getData(): Data {
        return this.data;
    }
}