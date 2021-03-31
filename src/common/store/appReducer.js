import { LOG_IN, LOG_OUT } from "./types";

const initialState = {
    isLogged: true
}

const appReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOG_IN: 
            return {...state, isLogged: true};
        case LOG_OUT:
            return {...state, isLogged: false};
        default: return state;
    };
};


export default appReducer;