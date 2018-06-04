import Express from 'express';
import bodyParser from 'body-parser';
import {serverPort} from './constant/configDb';
import UserService from './service/UserService';
import MessageService from './service/MessageService';
import * as dbUtils from './utils/DbUtils';
import websokify from 'express-ws';
import cors from 'cors';
import cookie from 'cookie-parser';


class Application {

    constructor() {
        this.app = Express();

        this.app.use(bodyParser.json());
        this.app.use(cookie());

        this.app.use(cors({
            origin: true,
            credentials: true
        }));

        websokify(this.app);
        this.clients = new Set();

        this.port = process.env.PORT || serverPort;

        dbUtils.dbCreateConnection();

        this.userService = new UserService();
        this.messagesService = new MessageService();

        this.startRoutes();

        this.app.listen(this.port, () => {
            console.log(`App start on port ${this.port}`);
        });
    }

    startRoutes() {
        this.app.post('/login', this.signInController.bind(this)); // всех новых заносим в базу,
                                                                   // для выхода нужно удалить куки
        this.app.post('/user', this.isUserRegisterController.bind(this));
        this.app.post('/messages', this.messagesController.bind(this));
        this.app.ws('/ws', this.wsController.bind(this));
    }

    messagesController(req, res) {
        this.messagesService.findAll()
            .then(list => {
                res.status(200).send(JSON.stringify(list.reverse()))
            })
            .catch(err => console.log(err));
    }

    isUserRegisterController(req, res) {
        const id = req.cookies.auth;

        this.userService.findUserById(id)
            .then(user => res.status(200).json({user: user}))
            .catch(() => res.status(200).json({user: null}));
    }

    async signInController(req, res) {
        let login = req.body.login;

        if (!login) {
            res.status(401).end();
        }

        let user = await this.userService.findUserByLogin(login);

        if (!user.length) {
            this.userService.addUser(login).then(person => {
                res.cookie('auth', person._id,
                    {expires: new Date(Date.now() + (1000 * 60 * 10))});
                res.status(201).json({user:person})
            });

        } else {

            res.cookie('auth', user[0]._id,
                {expires: new Date(Date.now() + (1000 * 60 * 10))});
            res.status(200).json({user:user[0]})

        }
    }


    wsController(ws) {

        this.clients.add(ws);
        console.log(this.clients.size);

        ws.on('message', (msg) => {
            try {
                if (!msg) {
                    return;
                }

                let {type, payload} = JSON.parse(msg);
                switch (type) {

                    case 'ADD_MESSAGE':

                        this.messagesService.createMessage(payload)
                            .then(() => this.messagesService.findAll()
                                .then(list => {

                                    list.reverse();
                                    [...this.clients.values()]
                                        .forEach(sockClient => {

                                            let dict = {
                                                type: 'ADD_MESSAGE',
                                                payload: list
                                            };

                                            sockClient.send(JSON.stringify(dict))});

                                }));

                        break;

                    case 'INIT_LIST':

                        if(!payload.user) {
                            break;
                        }

                        this.messagesService.findAll()
                            .then(list => {

                                list.reverse();
                                [...this.clients.values()]
                                    .forEach(sockClient => {

                                        let dict = {
                                            type: 'INIT_LIST',
                                            payload: list
                                        };

                                        sockClient.send(JSON.stringify(dict));
                                    });

                            });

                        break;
                }

            } catch (e) {
                console.error(e);
            }
        });

        ws.on('close', () => {
            this.clients.delete(ws);
            console.log('ws connection close');
        });
    }
}

new Application();
