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
  required: true,
  require: [],
  exclude: [],
};

const collectionAddress: QueryField = {
  id: "collectionAddress",
  fieldPath: "collectionAddress",
  operations: [FirestoreQueryOperation.EqualTo],
  required: true,
  require: [],
  exclude: [],
};

const startTime: QueryField = {
    id: "startTime",
    fieldPath: 'startTimeMs',
    operations: [FirestoreQueryOperation.LessThanOrEqualTo],
    required: true,
    require: [],
    exclude: [],
};

// const endTime: QueryField = {
//     id: "endTime",
//     fieldPath: 'endTimeMs',
//     operations: [FirestoreQueryOperation.GreaterThanOrEqualTo],
//     required: false,
//     require: [],
//     exclude: [],
// };

const numTokens: QueryField = {
  id: "numTokens",
  fieldPath: "numTokens",
  operations: [FirestoreQueryOperation.EqualTo],
  required: true,
  require: [],
  exclude: [],
};

const orderSide: QueryField = {
  id: "isSellOrder",
  fieldPath: "isSellOrder",
  operations: [FirestoreQueryOperation.EqualTo],
  required: true,
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

const makerAddress: QueryField = {
  id: "makerAddress",
  fieldPath: "makerAddress",
  operations: [FirestoreQueryOperation.EqualTo],
  required: false,
  require: [],
  exclude: [],
};

const tokenId: QueryField = {
  id: "tokenId",
  fieldPath: "tokenId",
  operations: [FirestoreQueryOperation.EqualTo],
  required: false,
  require: [],
  exclude: [],
};

const fields: QueryField[] = [
  orderStatus,
  chainId,
  collectionAddress,
  orderSide,
  numTokens,
  makerAddress,
  tokenId,
  startTime
];

const orderByStartTime: QueryOrderBy[] = [
  {
    id: "orderByStartTime",
    fieldPath: "startTimeMs",
    orderDirections: [
      FirestoreIndexOrder.Ascending,
    ],
    require: [startTime.id],
  },
];


const orderBy: QueryOrderBy[][] = [
    orderByStartTime,
];

export const orderConstraintQueries: IQuery = {
  collectionGroup: 'orderItems',
  queryScope: FirestoreQueryScope.CollectionGroup,
  fields: fields,
  orderBy: orderBy,
};
