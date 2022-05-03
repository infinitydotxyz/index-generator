import { FirestoreIndexMode } from "../../firestore/types/firestore-index-modes.types";
import { FirestoreIndexOrder } from "../../firestore/types/firestore-index-order.types";
import { QueryOrderBy as IQueryOrderBy } from "../types/query.types";
import { QueryFieldIndex } from "./Query";
import { QueryField as AbstractQueryField } from "./query-field.abstract";

export class QueryOrderByField extends AbstractQueryField {
    readonly isMergeAble = true;

    constructor(private readonly queryField: IQueryOrderBy) {
        super();
    }

    public get requires() {
        return this.queryField.require;
    }

    getDirectionalId(direction: FirestoreIndexOrder) {
        return `${this.queryField.id}-${direction}`;
    }

    getCombinations() {
        const queryFieldIndexes = [];
        for (const orderDirection of this.queryField.orderDirections) {
            const queryFieldIndex: QueryFieldIndex = {
                id: this.getDirectionalId(orderDirection),
                fieldPath: this.queryField.fieldPath,
                isOrderByField: true,
                indexMode:
                    orderDirection === FirestoreIndexOrder.Ascending
                        ? FirestoreIndexMode.Ascending
                        : FirestoreIndexMode.Descending,
                context: this
            };
            queryFieldIndexes.push(queryFieldIndex);
        }
        return queryFieldIndexes;
    }
}
