import RouterRegister from './modules/RouterRegister';
import BaseComponent from './components/BaseComponent/BaseComponent';
import SignIn from './views/SignIn/SignIn';
import Chat from './views/Chat/Chat';
import webSock from './service/Ws';

webSock.connect();

RouterRegister('root', [
    {
        path: '/login',
        component: SignIn,
    },
    {
        path: '/chat',
        component: Chat,
    }
], [new BaseComponent('div', {class: 'content'})]);
