import * as constants from '../shared/constants/AppConstants';
class UserService {

    async getUsers() {
        const data = await fetch(constants.USERAPI + '/users')
            .then(response => response.json())
            .then(response => {
                return response;
            })
            .catch(err => {
                console.log(err);
            });
        return data;
    }

}

export const userService = new UserService();