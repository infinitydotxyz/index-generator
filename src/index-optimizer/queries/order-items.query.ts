import { FirestoreIndexOrder } from "../../firestore/types/firestore-index-order.types";
import { FirestoreQueryOperation } from "../../firestore/types/firestore-query-operations.types";
import { FirestoreQueryScope } from "../../firestore/types/firestore-query-scope.types";
import { Query as IQuery, QueryField, QueryOrderBy } from "../types/query.types";

const fields: QueryField[] = [
    // {
    //     id: "chainId",
    //     fieldPath: "chainId",
    //     operations: [FirestoreQueryOperation.EqualTo],
    //     required: false,
    //     require: [],
    //     exclude: []
    // },
    {
        id: "isSellOrder",
        fieldPath: "isSellOrder",
        operations: [FirestoreQueryOperation.EqualTo],
        required: false,
        require: [],
        exclude: []
    },
    {
        id: "orderStatus",
        fieldPath: "orderStatus",
        operations: [FirestoreQueryOperation.EqualTo],
        required: true,
        require: [],
        exclude: []
    },
    {
        id: "numItems",
        fieldPath: "numItems",
        operations: [FirestoreQueryOperation.EqualTo],
        required: false,
        require: [],
        exclude: []
    },
    {
        id: "collections",
        fieldPath: "collectionAddress",
        operations: [FirestoreQueryOperation.In],
        required: false,
        require: [],
        exclude: []
    },
    {
        id: "price",
        fieldPath: "startPriceEth",
        operations: [FirestoreQueryOperation.GreaterThanOrEqualTo, FirestoreQueryOperation.LessThanOrEqualTo],
        required: false,
        require: [],
        exclude: []
    },
];

const orderBy: QueryOrderBy[][] = [
    [
        {
            id: "orderByStartPriceEth",
            fieldPath: "startPriceEth",
            orderDirections: [FirestoreIndexOrder.Ascending, FirestoreIndexOrder.Descending],
            requires: []
        }
    ],
    [
        {
            id: "orderByStartTime",
            fieldPath: "startTimeMs",
            orderDirections: [FirestoreIndexOrder.Ascending, FirestoreIndexOrder.Descending],
            requires: []
        }
    ],
    [
        {
            id: 'orderByEndTime',
            fieldPath: 'endTimeMs',
            orderDirections: [FirestoreIndexOrder.Ascending, FirestoreIndexOrder.Descending],
            requires: []
        }
    ]
];

export const orderItemsQuery: IQuery = {
    collectionGroup: "orderItems",
    queryScope: FirestoreQueryScope.CollectionGroup,
    fields: fields,
    orderBy: orderBy
};
