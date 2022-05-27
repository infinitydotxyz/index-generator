import { FirestoreIndexOrder } from "../../firestore/types/firestore-index-order.types";
import { FirestoreQueryOperation } from "../../firestore/types/firestore-query-operations.types";
import { FirestoreQueryScope } from "../../firestore/types/firestore-query-scope.types";
import {
  Query as IQuery,
  QueryField,
  QueryOrderBy,
} from "../types/query.types";


const lister = {
  id: "listerAddress",
  fieldPath: "listerAddress",
  operations: [
    FirestoreQueryOperation.EqualTo,
  ],
  required: true,
  require: [],
  exclude: [],
};

const offerer = {
  id: "offererAddress",
  fieldPath: "offererAddress",
  operations: [
    FirestoreQueryOperation.EqualTo,
  ],
  required: true,
  require: [],
  exclude: [],
};

const collectionAddresses = {
  id: "collectionAddresses",
  fieldPath: "collectionAddresses",
  operations: [
    FirestoreQueryOperation.ArrayContains,
  ],
  required: false,
  require: [],
  exclude: [],
};

const tokens = {
  id: "tokens",
  fieldPath: "tokens",
  operations: [
    FirestoreQueryOperation.ArrayContains,
  ],
  required: false,
  require: [],
  exclude: [collectionAddresses.id],
};

const offererFields: QueryField[] = [offerer, collectionAddresses, tokens];
const listerFields: QueryField[] = [lister, collectionAddresses, tokens];

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

export const orderMatchesForLister: IQuery = {
  collectionGroup: "orderMatches",
  queryScope: FirestoreQueryScope.CollectionGroup,
  fields: listerFields,
  orderBy: orderBy,
};


export const orderMatchesForOfferer: IQuery = {
  collectionGroup: "orderMatches",
  queryScope: FirestoreQueryScope.CollectionGroup,
  fields: offererFields,
  orderBy: orderBy,
};
