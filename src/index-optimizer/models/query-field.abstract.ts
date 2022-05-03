import { FirestoreField } from "../../firestore/types/firestore-field.types";


export abstract class QueryField {
    abstract isMergeAble: boolean;

    abstract requires: string[];

    abstract excludes: string[]
}