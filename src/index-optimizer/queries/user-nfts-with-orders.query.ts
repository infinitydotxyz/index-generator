import { FirestoreIndexOrder } from "../../firestore/types/firestore-index-order.types";
import { FirestoreQueryOperation } from "../../firestore/types/firestore-query-operations.types";
import { FirestoreQueryScope } from "../../firestore/types/firestore-query-scope.types";
import {
  Query as IQuery,
  QueryField,
  QueryOrderBy,
} from "../types/query.types";

const listingMakerAddress: QueryField = {
  id: "listingMakerAddress",
  fieldPath: "ordersSnippet.listing.orderItem.makerAddress",
  operations: [FirestoreQueryOperation.EqualTo],
  required: false,
  require: [],
  exclude: [],
};

const offerMakerAddress: QueryField = {
  id: "offerMakerAddress",
  fieldPath: "ordersSnippet.offer.orderItem.makerAddress",
  operations: [FirestoreQueryOperation.EqualTo],
  required: false,
  require: [],
  exclude: [listingMakerAddress.id],
};

const offerTakerAddress: QueryField = {
  id: "offerTakerAddress",
  fieldPath: "ordersSnippet.offer.orderItem.takerAddress",
  operations: [FirestoreQueryOperation.EqualTo],
  required: false,
  require: [],
  exclude: [listingMakerAddress.id, offerMakerAddress.id],
};

offerMakerAddress.exclude.push(offerTakerAddress.id);
listingMakerAddress.exclude.push(offerMakerAddress.id);
listingMakerAddress.exclude.push(offerTakerAddress.id);

const listingsCollections: QueryField = {
  id: "collections",
  fieldPath: "ordersSnippet.listing.orderItem.collectionAddress",
  operations: [FirestoreQueryOperation.In],
  required: false,
  require: [listingMakerAddress.id],
  exclude: [],
};

const offerMakerCollections: QueryField = {
  id: "collections",
  fieldPath: "ordersSnippet.listing.orderItem.collectionAddress",
  operations: [FirestoreQueryOperation.In],
  required: false,
  require: [offerMakerAddress.id],
  exclude: [],
};

const offerTakerCollections: QueryField = {
  id: "collections",
  fieldPath: "ordersSnippet.listing.orderItem.collectionAddress",
  operations: [FirestoreQueryOperation.In],
  required: false,
  require: [offerTakerAddress.id],
  exclude: [],
};

const fields: QueryField[] = [
  listingMakerAddress,
  offerMakerAddress,
  offerTakerAddress,
  offerMakerCollections,
  offerTakerCollections,
  listingsCollections,
];

const orderByListingStartPrice: QueryOrderBy[] = [
  {
    id: "orderByListingStartPrice",
    fieldPath: "ordersSnippet.listing.orderItem.startPriceEth",
    orderDirections: [
      FirestoreIndexOrder.Ascending,
      FirestoreIndexOrder.Descending,
    ],
    require: [listingMakerAddress.id],
  },
];

const orderByOfferStartPriceForOfferMaker: QueryOrderBy[] = [
  {
    id: "orderByOfferStartPrice",
    fieldPath: "ordersSnippet.offer.orderItem.startPriceEth",
    orderDirections: [
      FirestoreIndexOrder.Ascending,
      FirestoreIndexOrder.Descending,
    ],
    require: [offerMakerAddress.id],
  },
];

const orderByOfferStartPriceForOfferTaker: QueryOrderBy[] = [
  {
    id: "orderByOfferStartPrice",
    fieldPath: "ordersSnippet.offer.orderItem.startPriceEth",
    orderDirections: [
      FirestoreIndexOrder.Ascending,
      FirestoreIndexOrder.Descending,
    ],
    require: [offerTakerAddress.id],
  },
];

const orderBy: QueryOrderBy[][] = [
  orderByListingStartPrice,
  orderByOfferStartPriceForOfferMaker,
  orderByOfferStartPriceForOfferTaker,
];

export const userNftsWithOrdersQuery: IQuery = {
  collectionGroup: "nfts",
  queryScope: FirestoreQueryScope.CollectionGroup,
  fields: fields,
  orderBy: orderBy,
};
