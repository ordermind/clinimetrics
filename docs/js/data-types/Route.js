export default class Route {
    #paths;
    #responseHandler;
    #onLeaveHandler;

    constructor({paths, responseHandler, onLeaveHandler}) {
        this.#paths = paths;
        this.#responseHandler = responseHandler.bind(this);
        this.#onLeaveHandler = onLeaveHandler.bind(this);
    }

    get paths() {
        return this.#paths;
    }

    get responseHandler() {
        return this.#responseHandler;
    }

    get onLeaveHandler() {
        return this.#onLeaveHandler;
    }
}