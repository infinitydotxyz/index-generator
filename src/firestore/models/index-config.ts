import { FirestoreFieldOverride } from "../types/firestore-field-override.types";
import { FirestoreIndexConfig } from "../types/firestore-index-config.types";
import { FirestoreIndex } from "../types/firestore-index.types";

export class IndexConfig {
    private readonly _rawIndexes: FirestoreIndex[];
    private readonly _rawFieldOverrides: FirestoreFieldOverride[];

    constructor(private readonly _rawConfig: FirestoreIndexConfig) {
        this._rawIndexes = this._rawConfig.indexes;
        this._rawFieldOverrides = this._rawConfig.fieldOverrides;
    }
}
