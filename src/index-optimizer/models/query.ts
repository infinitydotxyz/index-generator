import { FirestoreField } from "../../firestore/types/firestore-field.types";
import { FirestoreIndexField } from "../../firestore/types/firestore-index-field.types";
import { FirestoreIndexMode } from "../../firestore/types/firestore-index-modes.types";
import { FirestoreIndexOrder } from "../../firestore/types/firestore-index-order.types";
import { FirestoreIndex } from "../../firestore/types/firestore-index.types";
import { FirestoreQueryScope } from "../../firestore/types/firestore-query-scope.types";
import { Query as IQuery } from "../types/query.types";
import { QueryField } from "./query-field";
import { QueryOrderByField } from "./query-order-by-field";

export interface QueryIndex {
    collectionGroup: string;
    queryScope: FirestoreQueryScope;
    fieldIndexes: QueryFieldIndex;
}

export interface BaseQueryFieldIndex {
    id: string;
    fieldPath: string;
    indexMode: FirestoreIndexMode;
    isOrderByField: boolean;
    context: QueryField | QueryOrderByField;
}

export interface WhereQueryFieldIndex extends BaseQueryFieldIndex {
    isOrderByField: false;
    context: QueryField;
}

export interface OrderByQueryFieldIndex extends BaseQueryFieldIndex {
    isOrderByField: true;
    context: QueryOrderByField;
}

export type QueryFieldIndex = WhereQueryFieldIndex | OrderByQueryFieldIndex;

export class Query {
    private queryFields: QueryField[];

    private orderByFields: QueryOrderByField[][];

    constructor(private readonly query: IQuery) {
        this.queryFields = query.fields.map((field) => new QueryField(field));
        this.orderByFields = this.query.orderBy.map((orderBy) =>
            orderBy.map((orderByField) => new QueryOrderByField(orderByField))
        );
    }

    getCombinations() {
        let requiredFields: QueryField[] = [];
        let optionalFields: QueryField[] = [];
        for (const queryField of this.queryFields) {
            if (queryField.isRequired) {
                requiredFields.push(queryField);
            } else {
                optionalFields.push(queryField);
            }
        }

        const helper = (requiredFields: QueryField[], optionalFields: QueryField[]): QueryField[][] => {
            let queryGroup = [...requiredFields];
            const optionalField = optionalFields.shift();
            if (!optionalField) {
                return [queryGroup];
            }
            const queryGroupWithOptionalField = [...queryGroup, optionalField];
            const subGroupsWithOptionalField = helper([...queryGroupWithOptionalField], [...optionalFields]);
            const subGroupsWithoutOptionalField = helper([...queryGroup], [...optionalFields]);
            return [...subGroupsWithOptionalField, ...subGroupsWithoutOptionalField];
        };

        let orderByHelper = (combined: OrderByQueryFieldIndex[], orderByGroupFieldsToCombine: QueryOrderByField[]) => {
            const toCombine = orderByGroupFieldsToCombine.shift();
            if (!toCombine) {
                return [combined];
            }
            const combinations = toCombine.getCombinations();

            let res: OrderByQueryFieldIndex[][] = [];
            for (const combo of combinations) {
                const comboResult = orderByHelper([...combined, combo], [...orderByGroupFieldsToCombine]);
                res = [...res, ...comboResult];
            }

            return res;
        };
        const orderByCombinations = this.orderByFields.flatMap((orderByGroup) => orderByHelper([], orderByGroup));
        const fieldCombinations = helper(requiredFields, optionalFields).map((queryFields) => {
            return queryFields.map((queryField) => queryField.getFieldIndex());
        });

        let indexes = [];
        for (const orderBy of orderByCombinations) {
            for (const fields of fieldCombinations) {
                indexes.push([...fields, ...orderBy]);
            }
        }
        
        console.log(`Found: ${orderByCombinations.length} orderBy combinations`);
        console.log(`Found: ${fieldCombinations.length} field combinations`);
        console.log(`Found: ${indexes.length} possible indexes`);

        /**
         * remove indexes that don't include all required fields
         */
        indexes = indexes.filter((index) => {
            const fieldIds = new Set(index.map((indexField) => indexField.id));
            for(const field of index) {
                for(const requiredField of field.context.requires) {
                    if(!fieldIds.has(requiredField)) {
                        return false;
                    }
                }
            }
            return true;
        });

        console.log(`Found: ${indexes.length} indexes after filtering out indexes that don't include all required fields`);

        /**
         * remove indexes that are include exclude fields
         */
         indexes = indexes.filter((index) => {
            const fieldIds = new Set(index.map((indexField) => indexField.id));
            for(const field of index) {
                for(const excludedField of field.context.excludes) {
                    if(fieldIds.has(excludedField)) {
                        return false;
                    }
                }
            }
            return true;
        });

        console.log(`Found: ${indexes.length} indexes after filtering out indexes that include excluded fields`);

        return indexes;
    }

    optimizeIndexes(indexes: (WhereQueryFieldIndex | OrderByQueryFieldIndex)[][]) {
        const MAX_ORDER_BY_FIELDS_TO_MERGE = 1;
        let startedWith = indexes.length;
        console.log(`Optimizing indexes. Started with ${startedWith} indexes`);
        let mergedIndexes: Map<string, { field: WhereQueryFieldIndex; orderBy?: OrderByQueryFieldIndex }> = new Map();

        const getMergedIndexId = (index: WhereQueryFieldIndex, orderByField?: OrderByQueryFieldIndex) => {
            return `${index.fieldPath}-${orderByField?.fieldPath}-${orderByField?.indexMode}`;
        };

        let optimizedIndexes: (WhereQueryFieldIndex | OrderByQueryFieldIndex)[][] = [];
        for (const indexFields of indexes) {
            let canMergeFields = true;
            let orderByFields = [];
            for (const field of indexFields) {
                if (field.isOrderByField) {
                    orderByFields.push(field);
                }
                if (!field.context.isMergeAble) {
                    canMergeFields = false;
                    break;
                }
            }

            if (canMergeFields && orderByFields.length <= MAX_ORDER_BY_FIELDS_TO_MERGE) {
                const orderBy = orderByFields.pop();
                let fieldIndexes = [...indexFields].filter((item) => !item.isOrderByField) as WhereQueryFieldIndex[];

                let optimized: (OrderByQueryFieldIndex | WhereQueryFieldIndex)[][] = [];
                for (const fieldIndex of fieldIndexes) {
                    const id = getMergedIndexId(fieldIndex, orderBy);
                    if (!mergedIndexes.has(id)) {
                        mergedIndexes.set(id, { field: fieldIndex, orderBy });
                        const index = [fieldIndex, orderBy].filter((item) => !!item) as (
                            | OrderByQueryFieldIndex
                            | WhereQueryFieldIndex
                        )[];
                        optimized.push(index);
                    }
                }
                optimizedIndexes = [...optimizedIndexes, ...optimized];
            } else {
                optimizedIndexes = [...optimizedIndexes, indexFields];
            }
        }

        optimizedIndexes = optimizedIndexes.filter((index) => index.length > 1);

        const optimized = optimizedIndexes.length;
        console.log(`Optimization resulted in: ${optimized} indexes`);

        if (optimized <= startedWith) {
            console.log(
                `Optimization resulted in ${startedWith - optimized} less indexes. Returning optimized indexes.`
            );
            return optimizedIndexes;
        } else {
            console.log(
                `Optimization resulted in ${optimized - startedWith} more indexes. Returning original indexes.`
            );
       
            return indexes;
        }
    }

    toFirestoreIndexes(indexes: (WhereQueryFieldIndex | OrderByQueryFieldIndex)[][]) {
        const toFirestoreIndexField = (field: WhereQueryFieldIndex | OrderByQueryFieldIndex) => {
            if(field.indexMode === FirestoreIndexMode.ArrayContains) {
                const firestoreField: FirestoreField = {
                    fieldPath: field.fieldPath,
                    arrayConfig: "CONTAINS"
                }
                return firestoreField;
            } 
            const firestoreField: FirestoreField = {
                fieldPath: field.fieldPath,
                order: field.indexMode as string as FirestoreIndexOrder
            }
            return firestoreField;

        };
        const firestoreIndexes = indexes.map((index) => {
            const firestoreIndex: FirestoreIndex = {
                collectionGroup: this.query.collectionGroup,
                queryScope: this.query.queryScope,
                fields: index.map((field) => toFirestoreIndexField(field))
            }
            return firestoreIndex;
        });

        return firestoreIndexes;
    }  
    
    removeDuplicates(firestoreIndexes: FirestoreIndex[]) {
        const fieldId = (field: FirestoreIndexField) => {
            if('order' in field) {
                return `${field.fieldPath}-${field.order}`;
            }
            return `${field.fieldPath}-${field.arrayConfig}`;
        }
        for(const firestoreIndex of firestoreIndexes) {
            const fieldIds = new Set();
            // remove duplicates 
            const uniqueFields = firestoreIndex.fields.reduce((acc: FirestoreIndexField[], field) => {
                const id = fieldId(field);
                if(fieldIds.has(id)) {
                    // keep the last field instead of the preceding one
                    acc = acc.filter((item) => fieldId(item) !== id);
                    return [...acc, field];
                } else {
                    fieldIds.add(id);
                    return [...acc, field];
                }
            }, []);
            firestoreIndex.fields = uniqueFields;
        }

        const indexId = (index: FirestoreIndex) => {

            const fieldIds = index.fields.map(fieldId);

            return `${index.collectionGroup}:${index.queryScope}:${fieldIds.join('-')}`;
        }

        const indexIds = new Set();
        const uniqueIndexes = firestoreIndexes.filter((index) => {
            const id = indexId(index);
            if(indexIds.has(id)) {
                console.log(`Found duplicate index`);
                return false;
            } else {
                indexIds.add(id);
                return true;
            }
        }).filter((item) => item.fields.length > 1);


        console.log(`Removed ${firestoreIndexes.length - uniqueIndexes.length} duplicate indexes`);
        console.log(`Found: ${uniqueIndexes.length} unique indexes`);
        return uniqueIndexes;
    }
}
