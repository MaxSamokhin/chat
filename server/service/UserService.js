import mongoose from 'mongoose';
import '../model/User';


export default class UserService {

    constructor() {
        this.User = mongoose.model('User');
    }

    addUser(login) {
        const user = new this.User({
            username: login
        });

        return user.save()
    }

    findUserByLogin(login) {
        return this.User.find({username : login});
    }

    findUserById(id) {
        return this.User.findById(id);
    }
}