import { Query } from "./models/query";
import { Query as IQuery } from "./types/query.types";
import * as fs from "fs";
import { collectionNftsQuery } from "./queries/collection-nfts.query";

function main() {
  const queryDefinition = collectionNftsQuery;
  const indexes = generate(queryDefinition);
  console.log(`Total indexes created: ${indexes.length}`);
  fs.writeFileSync("./results.json", JSON.stringify(indexes, null, 2));
}

function generate(q: IQuery) {
  const query = new Query(q);
  const indexes = query.getCombinations();
  const results = query.optimizeIndexes(indexes);

  const firestoreIndexes = query.toFirestoreIndexes(results);
  const uniqueIndexes = query.removeDuplicates(firestoreIndexes);
  return uniqueIndexes;
}

main();
