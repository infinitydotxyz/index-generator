import { indexModesByOperation } from "../../firestore/constants/index-operations-by-mode";
import { FirestoreQueryOperation } from "../../firestore/types/firestore-query-operations.types";
import { QueryField as IQueryField } from "../types/query.types";
import { WhereQueryFieldIndex } from "./query";
import { QueryField as AbstractQueryField } from "./query-field.abstract";

export class QueryField extends AbstractQueryField {
    constructor(private readonly queryField: IQueryField) {
        super();
    }

    public get id(): string {
        return this.queryField.id;
    }

    public get isRequired(): boolean {
        return this.queryField.required;
    }

    public getFieldIndex(): WhereQueryFieldIndex {
        const indexModes = [...new Set(this.queryField.operations.map((operation) => {
            return indexModesByOperation[operation][0];
        }))]

        const indexMode = indexModes[0];

        if(indexModes.length !== 1 || !indexMode) {
            throw new Error(`Support for multiple index modes per field is not implemented yet.`);
        }

        return {
            id: this.id,
            fieldPath: this.queryField.fieldPath,
            indexMode: indexMode,
            isOrderByField: false,
            context: this
        }
    }

    public getRequiredFields(queryFields: QueryField[]) {
        const requires = new Set(this.queryField.require);
        const requiredFields = queryFields.filter((item) => requires.has(item.id));
        if(requires.size !== requiredFields.length) {
            throw new Error(`Found: ${requiredFields.length} required fields for ${this.id}. Expected: ${requires.size}`);
        }
        return requiredFields;
    }

    public get isMergeAble(): boolean {
        return (
            this.queryField.operations.length === 1 && this.queryField.operations[0] === FirestoreQueryOperation.EqualTo
        );
    }
}
