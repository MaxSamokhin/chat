import Http from './Http';

class UserService {

    constructor() {
        this.user = null;
    }

    isLoggedIn() {
        return Http.post('user').then(user => {
            this.user = user;
            return user;
        });
    }

}

const userService = new UserService();
export default userService;