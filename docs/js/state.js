import {LocalStoragePersistedObservableObject} from "./observable-object.js";
import { cloneObject } from "./utils.js";

const today = new Date();

export const defaultValue = {
    general: {
        date: new String(today.getDate()).padStart(2, '0') + "-" + new String(today.getMonth() + 1).padStart(2, '0') + "-" + today.getFullYear()
    },
    six_mwt: {
        parcour: 10,
    },
}

const observableState = new LocalStoragePersistedObservableObject({localStorageId: "clinimetrics-state", defaultValue: cloneObject(defaultValue)});

export default observableState;
