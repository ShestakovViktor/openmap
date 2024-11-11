import {Data} from "@type";
import {migrate1} from ".";

export class Migrator {

    version(data: object): data is {
        system: {[key: number]: {id: number; name: string; value: number}};
    } {
        return "system" in data
            && Array.isArray(data.system)
            && Object.values(data.system).every(record =>
                "value" in record
                && "name" in record
                && typeof record.name == "string"
            );
    }

    migrate(data: object): Data {
        if (!this.version(data)) throw new Error();

        const version = Object.values(data.system)
            .find(item => item.name == "version");

        if (!version) throw new Error();

        const migrations = {...migrate1};

        // while (version.value in migrations) {
        //     migrations[version.value](data);
        // }

        return data as unknown as Data;
    }
}