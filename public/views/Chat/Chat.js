import ChatComponent from '../../components/ChatComponent/ChatComponent';
import BaseComponent from '../../components/BaseComponent/BaseComponent';
import UserService from '../../service/UserService';
import router from '../../modules/Router';
import eventEmitter from '../../modules/eventBus';
import {WS_GET_INIT_DATA} from '../../constant/SocketMessages';

const data = {
    header_title: 'Test task',
    method: 'post',
    name: 'signInForm',

    textarea: [
        {
            placeholder: 'Type message...',
            class: 'chat__input-box__textarea',
            name: 'message',
            rows: '1',
            cols: '31',
        }
    ]
};

export default class Chat extends BaseComponent {

    constructor() {
        super('div', {class: 'content__chat'});
    }

    rerender() {
        if (this._components) {
            this._components.forEach(element => element.remove());
        }
        this.build();
    }

    build() {

        UserService.isLoggedIn().then(() => {
            eventEmitter.on(WS_GET_INIT_DATA, ChatComponent.initData());
        });

        if (!UserService.user) {
            router.go('/login');
        }

        this.setData(data);

        this._components = [
            new ChatComponent(this.getData())
        ];

        this._components.forEach(elem => this.append(elem.render()));
        this.renderTo('root');
    }

}
