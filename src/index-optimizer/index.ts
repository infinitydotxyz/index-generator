import { Query } from "./models/query";
import * as fs from 'fs';

import { orderItemsQuery } from "./queries/order-items.query";
import { collectionNftsQuery} from './queries/collection-nfts.query';

const query = new Query(collectionNftsQuery);
const indexes = query.getCombinations();
const results = query.optimizeIndexes(indexes);

const firestoreIndexes = query.toFirestoreIndexes(results);
const uniqueIndexes = query.removeDuplicates(firestoreIndexes);
console.log(`Total indexes created: ${uniqueIndexes.length}`)

fs.writeFileSync('./results.json', JSON.stringify(uniqueIndexes, null, 2));



