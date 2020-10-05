import { ADDITION, SUBTRACTION, FIRSTNAME, LASTNAME, EMAIL, PASSWORD, CONFIRMPASSWORD, SIGNUP, SIGNUPERROR, SIGNIN, VERIFYTOKEN } from './ActionTypes';
import { AsyncStorage } from 'react-native';
const axios = require('axios')

export const addition = () => ({
    type: ADDITION,
});

export const subtraction = () => ({
    type: SUBTRACTION,
});

export const firstName = (text) => ({
    type: FIRSTNAME,
    text: text
});
export const lastName = (text) => ({
    type: LASTNAME,
    text
});
export const Email = (text) => ({
    type: EMAIL,
    text: text
});
export const password = (text) => ({
    type: PASSWORD,
    text: text
});
export const confirmPassword = (text) => ({
    type: CONFIRMPASSWORD,
    text: text
});
export const signUp = (user) => {
    return async dispatch => {

        let result = await registerUser(user);
        if (result) {

            dispatch({
                type: SIGNUP,
                user,
                id: result
            })
        } else {
            dispatch({
                type: SIGNUPERROR,
            })
        }

    }

};
export const signIn = (user) => {
    return async dispatch => {

        let result = await loginUser(user);
        if (result) {
            await AsyncStorage.setItem('auth-token', result);
            console.log(result);
            dispatch({
                type: SIGNIN,
                user,
                //id: ,
                token: result
            })
        } else {
            dispatch({
                type: SIGNUPERROR,
            })
        }

    }

};
export const verifyToken = (user) => {
    return async dispatch => {

        let result = await verifyUserToken(user);
        if (result) {

            dispatch({
                type: VERIFYTOKEN,
                user,
                token: result
            })
        } else {
            dispatch({
                type: SIGNUPERROR,
            })
        }

    }

};

function registerUser(user) {

    return axios.post('http://192.168.1.5:3000/api/user/register', {
            name: user.fName,
            email: user.email,
            password: user.password
        })
        .then(function(response) {
            console.log(response.data);
            return response.data.user;
        })
        .catch(function(error) {
            console.log(error);
            return false;
        })
}

function loginUser(user) {

    return axios.post('http://192.168.1.5:3000/api/user/login', {
            email: user.email,
            password: user.password
        })
        .then(function(response) {
            console.log(response.data);

            return response.data;
        })
        .catch(function(error) {
            console.log(error);
            return false;
        })
}

function verifyUserToken(user) {
    const headers = {
        'Content-Type': 'application/json',
        'auth-token': user.token,
    };
    return axios.get('http://192.168.1.5:3000/api/posts/', { headers })
        .then(function(response) {
            console.log(response.data);
            return response;
        })
        .catch(function(error) {
            console.log(error);
            return false;
        })
}