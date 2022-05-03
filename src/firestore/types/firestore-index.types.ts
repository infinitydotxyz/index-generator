import { FirestoreIndexField } from "./firestore-index-field.types";
import { FirestoreQueryScope } from "./firestore-query-scope.types";


export interface FirestoreIndex {
    /**
     * collection id the index applies to
     */
    collectionGroup: string;

    queryScope: FirestoreQueryScope;

    fields: FirestoreIndexField[]
}