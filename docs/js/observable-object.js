import Subscriber from "./data-types/Subscriber.js";

export class ObservableObject {
    #object;
    #proxy;
    #subscribers;

    constructor({object}) {
        this.#object = object;
        this.#subscribers = [];
    }

    #createProxy() {
        const subscribers = this.#subscribers;
        const handler = {
            get(target, prop) {
                return target[prop];
            },
            set(target, prop, value) {
                const oldTargetJSON = JSON.stringify(target);

                target[prop] = value;

                const newTargetJSON = JSON.stringify(target);

                if(oldTargetJSON !== newTargetJSON) {
                    for(const subscriber of subscribers) {
                        subscriber.handler(JSON.parse(newTargetJSON));
                    }
                }

                return target;
            },
        };

        return new Proxy(this.#object, handler);
    }

    #findSubscriberIndex(id) {
        return this.#subscribers.findIndex(subscriber => subscriber.id === id);
    }

    #hasSubscriber(id) {
        return this.#findSubscriberIndex(id) > -1 ? true : false;
    }

    addSubscriber(id, handler) {
        if(this.#hasSubscriber(id)) {
            throw new Error(`The subscriber "${id}" has already been registered.`);
        }

        this.#subscribers.push(new Subscriber({id, handler}));
    }

    removeSubscriber(id) {
        const index = this.#findSubscriberIndex(id);
        if(index <= -1) {
            return;
        }

        this.#subscribers.splice(index, 1);
    }

    getObject() {
        if(this.#proxy !== undefined) {
            return this.#proxy;
        }

        this.#proxy = this.#createProxy(this.#object);

        return this.#proxy;
    }

    getCurrentSubscribers() {
        return Object.keys(this.#subscribers);
    }
}

export class LocalStoragePersistedObservableObject extends ObservableObject {
    constructor({localStorageId, defaultValue}) {
        super({object: JSON.parse(localStorage.getItem(localStorageId)) ?? defaultValue});

        this.addSubscriber("addToLocalStorage", (state) => {
            localStorage.setItem(localStorageId, JSON.stringify(state));
        });
    }
}