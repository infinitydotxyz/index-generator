import { FirestoreQueryScope } from "../../firestore/types/firestore-query-scope.types";
import { FirestoreQueryOperation } from "../../firestore/types/firestore-query-operations.types";
import { FirestoreIndexOrder } from "../../firestore/types/firestore-index-order.types";

export interface QueryField {
    /**
     * a unique identifier for the query field
     * used to reference this query field
     */
    id: string;

    fieldPath: string;

    /**
     * all operations required for this field
     */
    operations: FirestoreQueryOperation[];

    /**
     * whether this query field is used in every possible
     * query for the relevant query description
     */
    required: boolean;

    /**
     * an array of query field ids that are present
     * whenever this query field is used
     */
    require: string[];

    /**
     * an array of query field ids that are never present
     * whenever this query field is used
     */
    exclude: string[];
}

export interface QueryOrderBy {
    id: string;
    fieldPath: string;
    orderDirections: FirestoreIndexOrder[];
    requires: string[];
}

export interface Query {
    collectionGroup: string;
    queryScope: FirestoreQueryScope;
    fields: QueryField[];
    orderBy: QueryOrderBy[][];
}
