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

const fields: QueryField[] = [users];

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

const orderBy: QueryOrderBy[][] = [orderByTimestamp];

export const orderMatchItems: IQuery = {
  collectionGroup: "orderMatchItems",
  queryScope: FirestoreQueryScope.CollectionGroup,
  fields: fields,
  orderBy: orderBy,
};
