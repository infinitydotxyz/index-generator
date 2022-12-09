import { Query } from "./models/query";
import { Query as IQuery } from "./types/query.types";
import * as fs from "fs";
import { collectionNftsQuery } from "./queries/collection-nfts.query";
import { orderItemsQuery } from "./queries/order-items.query";
import { userNftsWithOrdersQuery } from "./queries/user-nfts-with-orders.query";
import { orderConstraintQueries } from "./queries/order-constraint.query";
import {
  orderMatchesForLister,
  orderMatchesForOfferer,
} from "./queries/order-matches.query";
import { txBroadcasterMatchListener } from "./queries/tx-broadcaster-match-listener.query";
import {
  collectionOrdersByPriceQuery,
  collectionOrdersByTimeQuery,
  makerOrdersByPriceQuery,
  makerOrdersByTimeQuery,
  takerOrdersByPriceQuery,
  takerOrdersByTimeQuery,
  tokenOrdersByPriceQuery,
  tokenOrdersByTimeQuery,
} from "./queries/orderbook-v2.ts";
import { FirestoreIndex } from "../firestore/types/firestore-index.types";

function main() {
  const queryDefinition = collectionOrdersByPriceQuery;
  const queryDefinitions = [
    collectionOrdersByPriceQuery,
    collectionOrdersByTimeQuery,
    tokenOrdersByPriceQuery,
    tokenOrdersByTimeQuery,
    makerOrdersByPriceQuery,
    makerOrdersByTimeQuery,
    takerOrdersByPriceQuery,
    takerOrdersByTimeQuery,
  ];
  const indexes = generate(queryDefinitions);
  console.log(`Total indexes created: ${indexes.length}`);
  fs.writeFileSync("./results.json", JSON.stringify(indexes, null, 2));
}

function generate(queries: IQuery[]) {
  let firestoreIndexes: FirestoreIndex[] = [];
  for (const q of queries) {
    const query = new Query(q);
    const indexes = query.getCombinations();

    const results = query.optimizeIndexes(indexes);

    const items = query.toFirestoreIndexes(results);

    firestoreIndexes = [...firestoreIndexes, ...query.removeDuplicates(items)];
  }
  return firestoreIndexes;
}

main();
