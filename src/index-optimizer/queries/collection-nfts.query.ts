import { FirestoreIndexOrder } from "../../firestore/types/firestore-index-order.types";
import { FirestoreQueryOperation } from "../../firestore/types/firestore-query-operations.types";
import { FirestoreQueryScope } from "../../firestore/types/firestore-query-scope.types";
import { Query as IQuery, QueryField, QueryOrderBy } from "../types/query.types";



const fields: QueryField[] = [
    {
        id: "hasListing",
        fieldPath: "ordersSnippet.listing.hasOrder",
        operations: [FirestoreQueryOperation.EqualTo],
        required: false,
        require: [],
        exclude: []
    },
    {
        id: "hasOffer",
        fieldPath: "ordersSnippet.offer.hasOrder",
        operations: [FirestoreQueryOperation.EqualTo],
        required: false,
        require: [],
        exclude: []
    },
    {
        id: "traits",
        fieldPath: 'metadata.attributes',
        operations: [FirestoreQueryOperation.ArrayContainsAny],
        required: false,
        require: [],
        exclude: []
    },
    {
        id: "startPriceListing",
        fieldPath: "ordersSnippet.listing.orderItem.startPriceEth",
        operations: [FirestoreQueryOperation.GreaterThanOrEqualTo, FirestoreQueryOperation.LessThanOrEqualTo],
        required: false,
        require: [],
        exclude: []
    },
    {
        id: "startPriceOffer",
        fieldPath: "ordersSnippet.offer.orderItem.startPriceEth",
        operations: [FirestoreQueryOperation.GreaterThanOrEqualTo, FirestoreQueryOperation.LessThanOrEqualTo],
        required: false,
        require: [],
        exclude: []
    },
];

const orderBy: QueryOrderBy[][] = [
    [
        {
            id: "rarityRank",
            fieldPath: "rarityRank",
            orderDirections: [FirestoreIndexOrder.Ascending, FirestoreIndexOrder.Descending],
            requires: []
        }
    ],
    [
        {
            id: "tokenId",
            fieldPath: "tokenId",
            orderDirections: [FirestoreIndexOrder.Ascending, FirestoreIndexOrder.Descending],
            requires: []
        }
    ],
    [
        {
            id: 'priceListing',
            fieldPath: "ordersSnippet.listing.orderItem.startPriceEth",
            orderDirections: [FirestoreIndexOrder.Ascending, FirestoreIndexOrder.Descending],
            requires: []
        }
    ],
    [
        {
            id: 'priceOffer',
            fieldPath: "ordersSnippet.offer.orderItem.startPriceEth",
            orderDirections: [FirestoreIndexOrder.Ascending, FirestoreIndexOrder.Descending],
            requires: []
        }
    ]
];

export const collectionNftsQuery: IQuery = {
    collectionGroup: "orderItems",
    queryScope: FirestoreQueryScope.CollectionGroup,
    fields: fields,
    orderBy: orderBy
};