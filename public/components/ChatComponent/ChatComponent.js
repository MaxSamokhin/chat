import form from './ChatComponent.pug';
import BaseComponent from '../BaseComponent/BaseComponent';
import './ChatComponent.scss';
import webSock from '../../service/Ws';
import UserService from '../../service/UserService'
import MessagesComponent from '../MessagesComponent/MessageComponent';
import TimerComponent from '../TimerComponent/TimerComponent';
import eventEmitter from '../../modules/eventBus';
import {
    WS_RECEIVED_INIT_DATA,
    ADD_MESSAGE,
    INIT_LIST
} from '../../constant/SocketMessages';


export default class ChatComponent extends BaseComponent {

    constructor(data) {
        super('section', {class: 'chat'}, data);
        webSock.addListener(this.processDataWebSocket.bind(this));
    }

    render() {
        this._innerHTML('');
        this._innerHTML(form(this.getData()));

        this.messages = new MessagesComponent({messages: []});
        this.messagesContainer = this.getElement().getElementsByClassName('chat__messages')[0];
        this.messagesContainer.appendChild(this.messages.render());

        eventEmitter.on(WS_RECEIVED_INIT_DATA, this.setInitData.bind(this));
        this.listenForm();

        let timer = new TimerComponent();
        let timerContainer = this.getElement().getElementsByClassName('chat__timer')[0];
        timerContainer.appendChild(timer.render());

        setInterval(() => {
            timer.build()
        }, 1000);

        return this.getElement();
    }


    setInitData(messages) {
        this.renderNewMessages(messages);
        this.setScrollTop();
    }

    static initData() {
        webSock.sendMessage({
            type: INIT_LIST,
            payload: {
                user: UserService.user.user,
            },
        });
    }

    setScrollTop() {
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight
    }

    renderNewMessages(data) {
        this.messages.addMessage(data);
        this.setScrollTop();
    }

    processDataWebSocket(messages) {
        let listMessages = messages.map(elem => {
            return {
                text: elem.text,
                username: elem.username,
                isMy: (elem.username !== UserService.user.user.username)
            };
        });

        this.renderNewMessages(listMessages);
    }

    listenForm() {

        const form = this.getElement()
            .getElementsByClassName('chat__input-box')[0];
        const textArea = this.getElement()
            .getElementsByClassName('chat__input-box__textarea')[0];

        const submit = (e) => {
            e.preventDefault();

            const msg = {
                type: ADD_MESSAGE,
                payload: {
                    message: textArea.value,
                    user: UserService.user.user,
                }
            };

            textArea.value = '';
            webSock.sendMessage(msg);
        };

        form.addEventListener('submit', submit);
    }

}

