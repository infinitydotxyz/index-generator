import { FirestoreIndexMode } from "../types/firestore-index-modes.types";
import { FirestoreQueryOperation } from "../types/firestore-query-operations.types";

export const indexOperationsByMode = {
    [FirestoreIndexMode.Ascending]: [
        FirestoreQueryOperation.LessThan,
        FirestoreQueryOperation.LessThanOrEqualTo,
        FirestoreQueryOperation.EqualTo,
        FirestoreQueryOperation.GreaterThanOrEqualTo,
        FirestoreQueryOperation.GreaterThan,
        FirestoreQueryOperation.NotEqualTo,
        FirestoreQueryOperation.In,
        FirestoreQueryOperation.NotIn
    ],
    [FirestoreIndexMode.Descending]: [
        FirestoreQueryOperation.LessThan,
        FirestoreQueryOperation.LessThanOrEqualTo,
        FirestoreQueryOperation.EqualTo,
        FirestoreQueryOperation.GreaterThanOrEqualTo,
        FirestoreQueryOperation.GreaterThan,
        FirestoreQueryOperation.NotEqualTo,
        FirestoreQueryOperation.In,
        FirestoreQueryOperation.NotIn
    ],
    [FirestoreIndexMode.ArrayContains]: [
        FirestoreQueryOperation.ArrayContains,
        FirestoreQueryOperation.ArrayContainsAny
    ]
};

export const indexModesByOperation = {
    [FirestoreQueryOperation.LessThan]: [FirestoreIndexMode.Ascending],
    [FirestoreQueryOperation.LessThanOrEqualTo]: [FirestoreIndexMode.Ascending],
    [FirestoreQueryOperation.EqualTo]: [FirestoreIndexMode.Ascending],
    [FirestoreQueryOperation.GreaterThanOrEqualTo]: [FirestoreIndexMode.Ascending],
    [FirestoreQueryOperation.GreaterThan]: [FirestoreIndexMode.Ascending],
    [FirestoreQueryOperation.NotEqualTo]: [FirestoreIndexMode.Ascending],
    [FirestoreQueryOperation.In]: [FirestoreIndexMode.Ascending],
    [FirestoreQueryOperation.NotIn]: [FirestoreIndexMode.Ascending],
    [FirestoreQueryOperation.ArrayContains]: [FirestoreIndexMode.ArrayContains],
    [FirestoreQueryOperation.ArrayContainsAny]: [FirestoreIndexMode.ArrayContains]
};
