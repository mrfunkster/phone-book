import { CLEAR_USER_DATA, CLEAR_USER_ID, LOGIN_HIDE_LOADER, LOGIN_SHOW_LOADER, LOG_IN, LOG_OUT, SET_USER_DATA, SET_USER_ID } from "./types";

const initialState = {
    isLogged: false,
    loginLoader: false,
    userData: {},
    userID: ""
}

const appReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOG_IN: 
            return {...state, isLogged: true};
        case LOG_OUT:
            return {...state, isLogged: false};
        case LOGIN_SHOW_LOADER:
            return {...state, loginLoader: true};
        case LOGIN_HIDE_LOADER:
            return {...state, loginLoader: false};
        case SET_USER_DATA:
            return {...state, userData: action.payload};
        case CLEAR_USER_DATA:
            return {...state, userData: {}};
        case CLEAR_USER_ID:
            return {...state, userID: ""};
        case SET_USER_ID: 
            return {...state, userID: action.payload};
        default: return state;
    };
};


export default appReducer;