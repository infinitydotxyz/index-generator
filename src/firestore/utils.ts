import { FirestoreFieldOverrideIndex } from "./types/firestore-field-override-index.types";
import { FirestoreField } from "./types/firestore-field.types";
import { FirestoreIndexField } from "./types/firestore-index-field.types";

export function isOverrideField(field: FirestoreField): boolean {
    return "queryScope" in field;
}

export function isIndexField(field: FirestoreField): boolean {
    return "fieldPath" in field;
}

export function isNonArrayIndexField(index: FirestoreIndexField): boolean {
    return "order" in index;
}

export function isArrayIndexField(index: FirestoreIndexField): boolean {
    return "arrayConfig" in index;
}

export function isNonArrayFieldOverride(override: FirestoreFieldOverrideIndex): boolean {
    return "order" in override;
}

export function isArrayFieldOverride(override: FirestoreFieldOverrideIndex): boolean {
    return "arrayConfig" in override;
}

export function removeDuplicates<T>(array: T[], getId: (item: T) => string): T[] {
    const ids: Set<string> = new Set();
    return array.filter(item => {
        const id = getId(item);
        if (!ids.has(id)) {
            ids.add(id);
            return true;
        } 
        return false;
    });
}