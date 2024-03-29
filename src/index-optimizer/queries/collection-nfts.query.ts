import { FirestoreIndexOrder } from "../../firestore/types/firestore-index-order.types";
import { FirestoreQueryOperation } from "../../firestore/types/firestore-query-operations.types";
import { FirestoreQueryScope } from "../../firestore/types/firestore-query-scope.types";
import {
  Query as IQuery,
  QueryField,
  QueryOrderBy,
} from "../types/query.types";

const hasListing: QueryField = {
  id: "hasListing",
  fieldPath: "ordersSnippet.listing.hasOrder",
  operations: [FirestoreQueryOperation.EqualTo],
  required: false,
  require: [],
  exclude: [],
};
const hasOffer: QueryField = {
  id: "hasOffer",
  fieldPath: "ordersSnippet.offer.hasOrder",
  operations: [FirestoreQueryOperation.EqualTo],
  required: false,
  require: [],
  exclude: [hasListing.id],
};

hasListing.exclude.push(hasOffer.id);

const traits: QueryField = {
  id: "traits",
  fieldPath: "metadata.attributes",
  operations: [FirestoreQueryOperation.ArrayContainsAny],
  required: false,
  require: [],
  exclude: [],
};
const listingStartPrice: QueryField = {
  id: "startPriceListing",
  fieldPath: "ordersSnippet.listing.orderItem.startPriceEth",
  operations: [
    FirestoreQueryOperation.GreaterThanOrEqualTo,
    FirestoreQueryOperation.LessThanOrEqualTo,
  ],
  required: false,
  require: [hasListing.id],
  exclude: [],
};
const offerStartPrice: QueryField = {
  id: "startPriceOffer",
  fieldPath: "ordersSnippet.offer.orderItem.startPriceEth",
  operations: [
    FirestoreQueryOperation.GreaterThanOrEqualTo,
    FirestoreQueryOperation.LessThanOrEqualTo,
  ],
  required: false,
  require: [hasOffer.id],
  exclude: [],
};

const fields: QueryField[] = [
  hasListing,
  hasOffer,
  traits,
  listingStartPrice,
  offerStartPrice,
];

const orderByTokenIdNumeric: QueryOrderBy[] = [
  {
    id: "tokenIdNumeric",
    fieldPath: "tokenIdNumeric",
    orderDirections: [
      FirestoreIndexOrder.Ascending,
      FirestoreIndexOrder.Descending,
    ],
    require: [],
  },
];

const orderByListingPrice: QueryOrderBy[] = [
  {
    id: "priceListing",
    fieldPath: "ordersSnippet.listing.orderItem.startPriceEth",
    orderDirections: [
      FirestoreIndexOrder.Ascending,
      FirestoreIndexOrder.Descending,
    ],
    require: [hasListing.id],
  },
  orderByTokenIdNumeric[0],
];

const orderByOfferPrice: QueryOrderBy[] = [
  {
    id: "priceOffer",
    fieldPath: "ordersSnippet.offer.orderItem.startPriceEth",
    orderDirections: [
      FirestoreIndexOrder.Ascending,
      FirestoreIndexOrder.Descending,
    ],
    require: [hasOffer.id],
  },
  orderByTokenIdNumeric[0],
];

const orderBy: QueryOrderBy[][] = [
  orderByTokenIdNumeric,
  orderByListingPrice,
  orderByOfferPrice,
];

export const collectionNftsQuery: IQuery = {
  collectionGroup: "nfts",
  queryScope: FirestoreQueryScope.Collection,
  fields: fields,
  orderBy: orderBy,
};
