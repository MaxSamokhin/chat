'use strict';

class EventBus {
    constructor() {
        this.listeners = {};
    }

    on(event, listener) {
        this.listeners[event] = this.listeners[event] || [];
        this.listeners[event].push(listener);
        return listener;
    }

    off(event) {
        this.listeners[event] = this.listeners[event] || [];
        delete this.listeners[event];
    }

    emit(event, data) {
        if(this.listeners[event]) {
            this.listeners[event].forEach((listener) => {
                listener(data);
            });
        }
    }
}

let eventEmitter = new EventBus();
export default eventEmitter;