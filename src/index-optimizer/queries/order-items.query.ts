import { FirestoreIndexOrder } from "../../firestore/types/firestore-index-order.types";
import { FirestoreQueryOperation } from "../../firestore/types/firestore-query-operations.types";
import { FirestoreQueryScope } from "../../firestore/types/firestore-query-scope.types";
import {
  Query as IQuery,
  QueryField,
  QueryOrderBy,
} from "../types/query.types";

const chainId: QueryField = {
  id: "chainId",
  fieldPath: "chainId",
  operations: [FirestoreQueryOperation.EqualTo],
  required: false,
  require: [],
  exclude: [],
};

const isSellOrder: QueryField = {
  id: "isSellOrder",
  fieldPath: "isSellOrder",
  operations: [FirestoreQueryOperation.EqualTo],
  required: false,
  require: [],
  exclude: [],
};

const orderStatus: QueryField = {
  id: "orderStatus",
  fieldPath: "orderStatus",
  operations: [FirestoreQueryOperation.EqualTo],
  required: true,
  require: [],
  exclude: [],
};

const numItems: QueryField = {
  id: "numItems",
  fieldPath: "numItems",
  operations: [FirestoreQueryOperation.EqualTo],
  required: false,
  require: [],
  exclude: [],
};

const collections: QueryField = {
  id: "collections",
  fieldPath: "collectionAddress",
  operations: [FirestoreQueryOperation.In],
  required: false,
  require: [],
  exclude: [],
};

const makerAddress: QueryField = {
  id: "makerAddress",
  fieldPath: "makerAddress",
  operations: [FirestoreQueryOperation.EqualTo],
  required: false,
  require: [isSellOrder.id],
  exclude: [numItems.id],
};

const takerAddress: QueryField = {
  id: "takerAddress",
  fieldPath: "takerAddress",
  operations: [FirestoreQueryOperation.EqualTo],
  required: false,
  require: [isSellOrder.id],
  exclude: [numItems.id],
};

const price = {
  id: "price",
  fieldPath: "startPriceEth",
  operations: [
    FirestoreQueryOperation.GreaterThanOrEqualTo,
    FirestoreQueryOperation.LessThanOrEqualTo,
  ],
  required: false,
  require: [],
  exclude: [],
};

const fields: QueryField[] = [
  isSellOrder,
  makerAddress,
  takerAddress,
  orderStatus,
  numItems,
  collections,
  price,
];

const orderByStartPrice: QueryOrderBy[] = [
  {
    id: "orderByStartPriceEth",
    fieldPath: "startPriceEth",
    orderDirections: [
      FirestoreIndexOrder.Ascending,
      FirestoreIndexOrder.Descending,
    ],
    require: [],
  },
];

const orderByStartTime: QueryOrderBy[] = [
  {
    id: "orderByStartTime",
    fieldPath: "startTimeMs",
    orderDirections: [
      FirestoreIndexOrder.Ascending,
      FirestoreIndexOrder.Descending,
    ],
    require: [],
  },
];

const orderByEndTime: QueryOrderBy[] = [
  {
    id: "orderByEndTime",
    fieldPath: "endTimeMs",
    orderDirections: [
      FirestoreIndexOrder.Ascending,
      FirestoreIndexOrder.Descending,
    ],
    require: [],
  },
];

const orderBy: QueryOrderBy[][] = [
  orderByStartPrice,
  orderByStartTime,
  orderByEndTime,
];

export const orderItemsQuery: IQuery = {
  collectionGroup: "orderItems",
  queryScope: FirestoreQueryScope.CollectionGroup,
  fields: fields,
  orderBy: orderBy,
};
