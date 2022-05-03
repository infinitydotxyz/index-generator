# firestore-index-optimizer
optimize your indexes to automatically detect cases where you could benefit from index merging


## Goals
* Support taking a `firestore.indexes.json` file and returning a file with optimized indexes - via index merging 
    * Needs more research into what indexes can be merged
* Take a query definition and return the indexes that are required to support it

## Resources
* [Firestore index definitions](https://firebase.google.com/docs/reference/firestore/indexes/) 



