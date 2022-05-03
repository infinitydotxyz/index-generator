import { QueryOrderBy } from "../types/query.types";
import { QueryField as AbstractQueryField } from "./query-field.abstract";

export class QueryOrderByFields extends AbstractQueryField {
    get isMergeAble(): boolean  {
        return this.queryFields.length === 1;
    }

    constructor(private readonly queryFields: QueryOrderBy[]) {
        super();
    }

    getCombinations() {
        const combinations = [];
        for(const orderByClause of this.queryFields) {
            for(const orderDirection of orderByClause.orderDirections) {

            }
        }
    }

}