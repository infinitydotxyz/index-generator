import { FieldIndex as AbstractFieldIndex } from "./field-index.abstract";
import { FirestoreIndexField as IFieldIndex } from "../types/firestore-index-field.types";
import { FirestoreIndexMode } from "../types/firestore-index-modes.types";
import { FirestoreIndexOrder } from "../types/firestore-index-order.types";

export class FirestoreIndexField extends AbstractFieldIndex {
    getId(): string {
        return `${this.fieldPath}-${this.indexMode}`
    }

    get fieldPath(): string {
        return this.fieldIndex.fieldPath;
    }

    get indexMode(): FirestoreIndexMode {
        if ('order' in this.fieldIndex) {
            if(this.fieldIndex.order === FirestoreIndexOrder.Ascending) {
                return FirestoreIndexMode.Ascending;
            }
            return FirestoreIndexMode.Descending;
        }
        return FirestoreIndexMode.ArrayContains;
    }

    constructor(private readonly fieldIndex: IFieldIndex) {
        super();
    }
}
