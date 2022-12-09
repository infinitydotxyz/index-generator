import { FirestoreIndexOrder } from "../../../firestore/types/firestore-index-order.types";
import { FirestoreQueryOperation } from "../../../firestore/types/firestore-query-operations.types";
import { FirestoreQueryScope } from "../../../firestore/types/firestore-query-scope.types";
import { Query, QueryField, QueryOrderBy } from "../../types/query.types";

const isSellOrder: QueryField = {
  id: "isSellOrder",
  fieldPath: "order.isSellOrder",
  operations: [FirestoreQueryOperation.EqualTo],
  required: false,
  require: [],
  exclude: [],
};

const minPrice: QueryField = {
  id: "minPrice",
  fieldPath: "order.startPriceEth",
  operations: [FirestoreQueryOperation.GreaterThanOrEqualTo],
  required: true,
  require: [],
  exclude: [],
};

const maxPrice: QueryField = {
  id: "maxPrice",
  fieldPath: "order.startPriceEth",
  operations: [FirestoreQueryOperation.LessThan],
  required: true,
  require: [minPrice.id],
  exclude: [],
};

minPrice.require.push(maxPrice.id);

const statusRequired: QueryField = {
  id: "status",
  fieldPath: "order.status",
  operations: [FirestoreQueryOperation.EqualTo],
  required: true,
  require: [],
  exclude: [],
};

const statusNotRequired: QueryField = {
  id: "status",
  fieldPath: "order.status",
  operations: [FirestoreQueryOperation.EqualTo],
  required: false,
  require: [],
  exclude: [],
};

const chainId: QueryField = {
  id: "chainId",
  fieldPath: "metadata.chainId",
  operations: [FirestoreQueryOperation.EqualTo],
  required: true,
  require: [],
  exclude: [],
};

const orderByOrderIdASC: QueryOrderBy = {
  id: "orderId",
  fieldPath: "metadata.id",
  orderDirections: [FirestoreIndexOrder.Ascending],
  require: [],
};

const orderByOrderIdDESC: QueryOrderBy = {
  id: "orderId",
  fieldPath: "metadata.id",
  orderDirections: [FirestoreIndexOrder.Descending],
  require: [],
};

const orderByStartPriceASC: QueryOrderBy[] = [
  {
    id: "startPriceOrderBy",
    fieldPath: "order.startPriceEth",
    orderDirections: [FirestoreIndexOrder.Ascending],
    require: [minPrice.id, maxPrice.id],
  },
  orderByOrderIdASC,
];

const orderByStartPriceDESC: QueryOrderBy[] = [
  {
    id: "startPriceOrderBy",
    fieldPath: "order.startPriceEth",
    orderDirections: [FirestoreIndexOrder.Descending],
    require: [minPrice.id, maxPrice.id],
  },
  orderByOrderIdDESC,
];

const orderByStartTimeASC: QueryOrderBy[] = [
  {
    id: "startTimeOrderBy",
    fieldPath: "order.startTimeMs",
    orderDirections: [FirestoreIndexOrder.Ascending],
    require: [],
  },
  orderByOrderIdASC,
];

const orderByStartTimeDESC: QueryOrderBy[] = [
  {
    id: "startTimeOrderBy",
    fieldPath: "order.startTimeMs",
    orderDirections: [FirestoreIndexOrder.Descending],
    require: [],
  },
  orderByOrderIdDESC,
];

const orderByEndTimeASC: QueryOrderBy[] = [
  {
    id: "endTimeOrderBy",
    fieldPath: "order.endTimeMs",
    orderDirections: [FirestoreIndexOrder.Ascending],
    require: [],
  },
  orderByOrderIdASC,
];

const orderByEndTimeDESC: QueryOrderBy[] = [
  {
    id: "endTimeOrderBy",
    fieldPath: "order.endTimeMs",
    orderDirections: [FirestoreIndexOrder.Descending],
    require: [],
  },
  orderByOrderIdDESC,
];

const orderByPrice: QueryOrderBy[][] = [
  orderByStartPriceASC,
  orderByStartPriceDESC,
];
const orderByPriceFields = [isSellOrder, minPrice, maxPrice, chainId];

const orderByTime: QueryOrderBy[][] = [
  orderByStartTimeASC,
  orderByStartTimeDESC,
];
const orderByTimeFields = [isSellOrder, chainId];

export const collectionOrdersByPriceQuery: Query = {
  collectionGroup: "collectionV2Orders",
  queryScope: FirestoreQueryScope.Collection,
  fields: [...orderByPriceFields, statusRequired],
  orderBy: orderByPrice,
};

export const collectionOrdersByTimeQuery: Query = {
  collectionGroup: "collectionV2Orders",
  queryScope: FirestoreQueryScope.Collection,
  fields: [...orderByTimeFields, statusRequired],
  orderBy: orderByTime,
};

export const tokenOrdersByPriceQuery: Query = {
  collectionGroup: "tokenV2Orders",
  queryScope: FirestoreQueryScope.Collection,
  fields: [...orderByPriceFields, statusRequired],
  orderBy: orderByPrice,
};

export const tokenOrdersByTimeQuery: Query = {
  collectionGroup: "tokenV2Orders",
  queryScope: FirestoreQueryScope.Collection,
  fields: [...orderByTimeFields, statusRequired],
  orderBy: orderByTime,
};

export const makerOrdersByPriceQuery: Query = {
  collectionGroup: "makerV2Orders",
  queryScope: FirestoreQueryScope.Collection,
  fields: [...orderByPriceFields, statusNotRequired],
  orderBy: orderByPrice,
};

export const makerOrdersByTimeQuery: Query = {
  collectionGroup: "makerV2Orders",
  queryScope: FirestoreQueryScope.Collection,
  fields: [...orderByTimeFields, statusNotRequired],
  orderBy: orderByTime,
};

const owner: QueryField = {
  id: "owner",
  fieldPath: "order.owners",
  operations: [FirestoreQueryOperation.ArrayContains],
  required: true,
  require: [],
  exclude: [],
};

export const takerOrdersByPriceQuery: Query = {
  collectionGroup: "tokenV2Orders",
  queryScope: FirestoreQueryScope.CollectionGroup,
  fields: [...orderByPriceFields, statusRequired, owner],
  orderBy: orderByPrice,
};

export const takerOrdersByTimeQuery: Query = {
  collectionGroup: "tokenV2Orders",
  queryScope: FirestoreQueryScope.CollectionGroup,
  fields: [...orderByTimeFields, statusRequired, owner],
  orderBy: orderByTime,
};
