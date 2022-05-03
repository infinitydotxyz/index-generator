import { FirestoreIndex as AbstractFirestoreIndex } from "./index.abstract";
import { FieldIndexFactory } from './field-index.factory';
import { FirestoreFieldOverride as IFieldOverride } from '../types/firestore-field-override.types';

export class FirestoreOverride extends AbstractFirestoreIndex {
    get fieldPath(): string {
        return this.override.fieldPath;
    }

    getId(): string {
        const fieldsId = this.getFieldsId();
        return `${this.collectionGroup}-${this.fieldPath}-${fieldsId}`;
    }

    constructor(private readonly override: IFieldOverride) {
        super(override.collectionGroup, override.indexes.map((item) => FieldIndexFactory.create(item)));
    }
}