import {LocalStoragePersistedObservableObject} from "./observable-object.js";

const today = new Date();

const defaultValue = {
    general: {
        date: new String(today.getDate()).padStart(2, '0') + "-" + new String(today.getMonth() + 1).padStart(2, '0') + "-" + today.getFullYear()
    },
    six_mwt: {
        parcour: 10,
    },
}

const observableState = new LocalStoragePersistedObservableObject({localStorageId: "clinimetrics-state", defaultValue});

export default observableState;
