import SignInComponent from '../../components/SignInComponent/SignInComponent';
import BaseComponent from '../../components/BaseComponent/BaseComponent';
import UserService from '../../service/UserService';
import router from '../../modules/Router';
import eventEmitter from '../../modules/eventBus';
import ChatComponent from '../../components/ChatComponent/ChatComponent';
import {WS_GET_INIT_DATA} from '../../constant/SocketMessages';


const data = {
    method: 'post',
    name: 'signInForm',

    fields: [
        {
            title: 'username',
            type: 'text',
            name: 'login',
            placeholder: 'username',
            class: 'form__info__input',
        }
    ],

    buttons: [
        {
            class_button: 'form__button__text',
            text: 'Get Started',
            url: '/chat'
        }
    ]
};

export default class SignIn extends BaseComponent {

    constructor() {
        super('div', {class: 'content__signin'});

    }

    rerender() {
        if (this._components) {
            this._components.forEach(element => element.remove());
        }
        this.build();
    }

    build() {

        UserService.isLoggedIn().then(user => {
            eventEmitter.on(WS_GET_INIT_DATA, ChatComponent.initData());
            if (user.user) {
                router.go('/chat');
            }
        });


        this.setData(data);
        this._components = [
            new SignInComponent(this.getData())
        ];

        this._components.forEach(elem => {
                this.append(elem.render())
            }
        );
        this.renderTo('root');
    }

}
