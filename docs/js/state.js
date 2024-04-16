import {LocalStoragePersistedObservableObject} from "./observable-object.js";

const defaultValue = {
    general: {
        date: new Date().toLocaleDateString("nl-NL"),
    },
}

const observableState = new LocalStoragePersistedObservableObject({localStorageId: "clinimetrics-state", defaultValue});

export default observableState;
