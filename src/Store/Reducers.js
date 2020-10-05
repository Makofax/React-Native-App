import { ADDITION, SUBTRACTION, FIRSTNAME, LASTNAME, EMAIL, PASSWORD, CONFIRMPASSWORD, SIGNUP, SIGNUPERROR, SIGNIN, VERIFYTOKEN } from './ActionTypes';
import { signUp } from './Actions';

const initialState = {
    counter: 0,
    firstName: null,
    lastName: null,
    Email: null,
    password: null,
    confirmPassword: null,
    isLoggedIn: false,
    error: false,
    id: null,
    token: null,
    isLoading: true,
}

export const mainReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADDITION:
            return {...state, counter: state.counter + 1 };
        case SUBTRACTION:
            return {...state, counter: state.counter - 1 };
        case FIRSTNAME:
            return {...state, firstName: action.text };
        case LASTNAME:
            return {...state, lastName: action.text };
        case EMAIL:
            return {...state, Email: action.text };
        case PASSWORD:
            return {...state, password: action.text };
        case CONFIRMPASSWORD:
            return {...state, confirmPassword: action.text };
        case SIGNUP:
            return {
                ...state,
                firstName: action.user.fName,
                lastName: action.user.lName,
                Email: action.user.email,
                password: action.user.password,
                confirmPassword: action.user.confirmPassword,
                error: false,
                id: action.id
            };
        case SIGNIN:
            return {
                ...state,
                Email: action.user.email,
                password: action.user.password,
                error: false,
                token: action.token
            };
        case VERIFYTOKEN:
            return {
                ...state,
                error: false,
                token: action.token,
                isLoading: false,
            };
        case SIGNUPERROR:
            return {...state, error: true };

        default:
            return state;
    }
};