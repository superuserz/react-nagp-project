import * as constants from '../shared/constants/AppConstants';
class UserService {

    async getUsers() {
        const data = await fetch(constants.USERAPI + '/users')
            .then(response => response.json())
            .then(response => {
                return response;
            })
            .catch(err => {
            });
        return data;
    }

    registerUser(payload) {
        fetch("http://localhost:3001/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        }).then(
            response => {

            }
        );
    }

    async getTransactions() {
        const data = await fetch('http://localhost:3001/transactions')
            .then(response => response.json())
            .then(response => {
                return response;
            })
            .catch(err => {

            });
        return data;
    }

    executeTransaction(payload) {
        fetch("http://localhost:3001/transactions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        }).then(
            response => { }
        );
    }
}

export const userService = new UserService();