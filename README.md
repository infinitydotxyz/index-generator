# firestore-index-optimizer
optimize your indexes to automatically detect cases where you could benefit from index merging

## Generating indexes
* For each query, create a new file in `src/index-optimizer/queries` 
    * A query is defined as a group of possible where/orderBy clauses (i.e. )
* Create query field/query order by/query objects that implement the `Query`, `QueryField`, and `QueryOrderBy` interfaces
* Each of these includes logic for requiring/excluding other fields to reduce the number of possible index
* Be as specific as possible to limit the number of possible queries
* Set the query you would like to generate indexes for in `src/index-optimizer/index.ts`
* Generate the indexes by running `npm run start:opt`
* A file with the generated indexes will be written to `results.json`

## Goals
* Support taking a `firestore.indexes.json` file and returning a file with optimized indexes - via index merging 
    * Needs more research into what indexes can be merged
* Take a query definition and return the indexes that are required to support it

## Resources
* [Firestore index definitions](https://firebase.google.com/docs/reference/firestore/indexes/) 
* [Index merging](https://firebase.google.com/docs/firestore/query-data/index-overview#taking_advantage_of_index_merging)
    * can index merging be used with relational operators? <= >=
