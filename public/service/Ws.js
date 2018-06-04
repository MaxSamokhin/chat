import config from '../constant/config.js';
import eventEmitter from '../modules/eventBus';
import UserService from './UserService';
import {
    WS_GET_INIT_DATA,
    WS_RECEIVED_INIT_DATA,
    ADD_MESSAGE,
    INIT_LIST
} from '../constant/SocketMessages';

class Ws {

    constructor() {
        let protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
        this.address = `${protocol}//${config.BASE_URL_WS}`;
        this.ws = new WebSocket(this.address);
    }

    connect() {
        this.ws.onopen = () => {

            if (this.ws.readyState === 1) {
                eventEmitter.emit(WS_GET_INIT_DATA, null);
            }

            this.ws.onmessage = ({data}) => {

                const {type, payload} = JSON.parse(data);

                switch (type) {

                    case INIT_LIST:

                        let messages = payload.map(elem => {
                            return {
                                text: elem.text,
                                username: elem.username,
                                isMy: (elem.username !== UserService.user.user.username)
                            };
                        });

                        eventEmitter.emit(WS_RECEIVED_INIT_DATA, messages);
                        break;

                    case ADD_MESSAGE :
                        if (this.callback) {
                            this.callback(payload);
                        }
                        break;
                }

            };

            setInterval(() => {
                this.ws.send('');
            }, 9000);
        };

    }

    addListener(callback) {
        this.callback = callback || null;

    }


    sendMessage(message) {
        this.ws.send(JSON.stringify(message));
    }

}

const webSock = new Ws();
export default webSock;