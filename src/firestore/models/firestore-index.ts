import { FirestoreIndex as AbstractFirestoreIndex } from "./index.abstract";
import { FirestoreIndex as IFirestoreIndex } from '../types/firestore-index.types';
import { FirestoreQueryScope } from "../types/firestore-query-scope.types";
import { FieldIndexFactory } from './field-index.factory';

export class FirestoreIndex extends AbstractFirestoreIndex {
    get queryScope(): FirestoreQueryScope {
        return this.index.queryScope;
    }

    getId(): string {
        const fieldsId = this.getFieldsId();
        return `${this.collectionGroup}-${this.queryScope}-${fieldsId}`;
    }

    constructor(private index: IFirestoreIndex) {
        super(index.collectionGroup, index.fields.map((item) => FieldIndexFactory.create(item)));
    }
}