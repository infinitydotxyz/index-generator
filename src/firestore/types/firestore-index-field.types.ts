import { FirestoreIndexOrder } from "./firestore-index-order.types";

export interface BaseFirestoreIndexField {
    /**
     * path to the field to be indexed (using dot notation)
     */
    fieldPath: string;
}


export interface NonArrayFirestoreIndexField extends BaseFirestoreIndexField {
    order: FirestoreIndexOrder;
}

export interface ArrayFirestoreIndexField extends BaseFirestoreIndexField{
    arrayConfig: 'CONTAINS';
}

export type FirestoreIndexField = NonArrayFirestoreIndexField | ArrayFirestoreIndexField;