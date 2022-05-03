import { FirestoreField } from "../types/firestore-field.types";
import { FieldIndex } from "./field-index.abstract";
import { FirestoreIndexField } from "./firestore-index-field";
import { FirestoreIndexOverrideField } from "./firestore-index-override-field";


export class FieldIndexFactory {
    static create(field: FirestoreField): FieldIndex {
        if('fieldPath' in field) {
            return new FirestoreIndexField(field);
        }
        return new FirestoreIndexOverrideField(field);
    }
}