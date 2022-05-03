import { FirestoreFieldOverrideIndex } from "./firestore-field-override-index.types";

export interface FirestoreFieldOverride {
    /**
     * collection id the index applies to
     */
    collectionGroup: string;

    /**
     * field path to the field to be excluded from indexing 
     * (uses dot notation)
     */
    fieldPath: string;

    indexes: FirestoreFieldOverrideIndex[]
}
