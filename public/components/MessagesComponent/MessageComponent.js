import messages from './MessageComponent.pug';
import BaseComponent from '../BaseComponent/BaseComponent';
import './MessageComponent.scss';

export default class MessageComponent extends BaseComponent {

    constructor(messages) {
        super();
        this.messages = messages;
        this.build();
    }

    addMessage(message) {
        this.messages.messages = message;
        this.build();
    }

    build() {
        this._innerHTML(messages(this.messages));
    }

}