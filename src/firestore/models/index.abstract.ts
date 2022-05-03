import { FieldIndex } from "./field-index.abstract";


export abstract class FirestoreIndex {
    abstract getId(): string;

    constructor(public readonly collectionGroup: string, public readonly fields: FieldIndex[]) {}

    getFieldsId(): string {
        return this.fields.sort(function (a: any, b: any) {
            return a.getId().localeCompare(b.getId());
        }).join(':');
    }
}
