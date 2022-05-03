import { FirestoreIndexOrder } from "./firestore-index-order.types";
import { FirestoreQueryScope } from "./firestore-query-scope.types";

export interface BaseFirestoreFieldOverrideIndex {
    queryScope: FirestoreQueryScope;
}

export interface NonArrayFirestoreFieldOverrideIndex extends BaseFirestoreFieldOverrideIndex {
    order: FirestoreIndexOrder;
}

export interface ArrayFirestoreFieldOverrideIndex extends BaseFirestoreFieldOverrideIndex{
    arrayConfig: 'CONTAINS'
}

export type FirestoreFieldOverrideIndex = NonArrayFirestoreFieldOverrideIndex | ArrayFirestoreFieldOverrideIndex;