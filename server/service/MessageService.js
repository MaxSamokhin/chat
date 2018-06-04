import mongoose from 'mongoose';
import '../model/Message.js';

export default class MessageService {

    constructor() {
        this.Message = mongoose.model('Message');
    }

    createMessage(data) {
        const msg = new this.Message({
            date: new Date(),
            text: data.message,
            username: data.user.username
        });

        return msg.save();
    }

    findAll() {
        return this.Message
            .find()
            .sort({date: -1})
            .limit(19);
    }

}

