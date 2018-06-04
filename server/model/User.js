import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const UserSchema = new Schema({
    username: {type: String},
});

const User = mongoose.model('User', UserSchema);