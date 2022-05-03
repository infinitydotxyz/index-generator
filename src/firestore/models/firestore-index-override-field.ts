

import { FieldIndex as AbstractFieldIndex } from "./field-index.abstract";
import { FirestoreIndexMode } from "../types/firestore-index-modes.types";
import { FirestoreIndexOrder } from "../types/firestore-index-order.types";
import { FirestoreFieldOverrideIndex } from "../types/firestore-field-override-index.types";

export class FirestoreIndexOverrideField extends AbstractFieldIndex {
    getId(): string {
        return `${this.queryScope}-${this.indexMode}`
    }

    get queryScope() {
        return this.fieldOverride.queryScope;
    }

    get indexMode(): FirestoreIndexMode {
        if ('order' in this.fieldOverride) {
            if(this.fieldOverride.order === FirestoreIndexOrder.Ascending) {
                return FirestoreIndexMode.Ascending;
            }
            return FirestoreIndexMode.Descending;
        }
        return FirestoreIndexMode.ArrayContains;
    }

    constructor(private readonly fieldOverride: FirestoreFieldOverrideIndex) {
        super();
    }
}
