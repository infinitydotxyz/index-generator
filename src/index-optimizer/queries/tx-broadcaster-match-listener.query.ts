import { FirestoreIndexOrder } from "../../firestore/types/firestore-index-order.types";
import { FirestoreQueryOperation } from "../../firestore/types/firestore-query-operations.types";
import { FirestoreQueryScope } from "../../firestore/types/firestore-query-scope.types";
import {
  Query as IQuery,
  QueryField,
  QueryOrderBy,
} from "../types/query.types";

const status = {
  id: "status",
  fieldPath: "state.status",
  operations: [FirestoreQueryOperation.EqualTo],
  required: true,
  require: [],
  exclude: [],
};

const complicationAddress = {
  id: "complicationAddress",
  fieldPath: "complicationAddress",
  operations: [FirestoreQueryOperation.In],
  required: true,
  require: [],
  exclude: [],
};

const queryFields: QueryField[] = [status, complicationAddress];

const orderBy: QueryOrderBy[][] = [];

export const txBroadcasterMatchListener: IQuery = {
  collectionGroup: "orderMatches",
  queryScope: FirestoreQueryScope.Collection,
  fields: queryFields,
  orderBy: orderBy,
};

// TODO fix error where having 0 order by fields results in 0 indexes being created