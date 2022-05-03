import { FirestoreFieldOverride } from "./firestore-field-override.types";
import { FirestoreIndex } from "./firestore-index.types";



export interface FirestoreIndexConfig {
    indexes: FirestoreIndex[];

    fieldOverrides: FirestoreFieldOverride[];
}