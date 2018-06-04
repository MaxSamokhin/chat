import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const MessageSchema = new Schema({
    date: {type: Date},
    text: {type: String},
    username: {type: String}
});

const Message = mongoose.model('Message', MessageSchema);
