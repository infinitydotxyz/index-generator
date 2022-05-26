import { FirestoreIndexOrder } from "../../firestore/types/firestore-index-order.types";
import { FirestoreQueryOperation } from "../../firestore/types/firestore-query-operations.types";
import { FirestoreQueryScope } from "../../firestore/types/firestore-query-scope.types";
import {
  Query as IQuery,
  QueryField,
  QueryOrderBy,
} from "../types/query.types";

const users = {
  id: "usersInvolved",
  fieldPath: "usersInvolved",
  operations: [
    FirestoreQueryOperation.ArrayContains,
  ],
  required: true,
  require: [],
  exclude: [],
};

const collectionAddress = {
  id: "collectionAddress",
  fieldPath: "collectionAddress",
  operations: [
    FirestoreQueryOperation.EqualTo,
  ],
  required: false,
  require: [],
  exclude: [],
};

const tokenId = {
  id: "tokenId",
  fieldPath: "tokenId",
  operations: [
    FirestoreQueryOperation.EqualTo,
  ],
  required: false,
  require: [],
  exclude: [],
};

const fields: QueryField[] = [users, collectionAddress, tokenId];

const orderByTimestamp: QueryOrderBy[] = [
  {
    id: "timestamp",
    fieldPath: "timestamp",
    orderDirections: [
      FirestoreIndexOrder.Ascending,
      FirestoreIndexOrder.Descending,
    ],
    require: [],
  },
];

const orderByCreatedAt: QueryOrderBy[] = [
  {
    id: "createdAt",
    fieldPath: "createdAt",
    orderDirections: [
      FirestoreIndexOrder.Ascending,
      FirestoreIndexOrder.Descending,
    ],
    require: [],
  },
];

const orderBy: QueryOrderBy[][] = [orderByTimestamp, orderByCreatedAt];

export const orderMatchItems: IQuery = {
  collectionGroup: "orderMatchItems",
  queryScope: FirestoreQueryScope.CollectionGroup,
  fields: fields,
  orderBy: orderBy,
};
