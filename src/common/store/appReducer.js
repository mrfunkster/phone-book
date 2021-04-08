import { CLEAR_CONTACT_IMAGE, CLEAR_COOKIE_STATE, CLEAR_PHONE_CONTACTS, CLEAR_SEARCH_QUERY, CLEAR_USER_CONTACT, CLEAR_USER_DATA, CLEAR_USER_ID, GET_CONTACT_IMAGE, GET_PHONE_CONTACTS, HIDE_CONTACTS_LOADER, HIDE_MOBILE_PREVIEW, IS_MOBILE, LOGIN_HIDE_LOADER, LOGIN_SHOW_LOADER, LOG_IN, LOG_OUT, SELECT_USER_CONTACT, SET_COOKIE_STATE, SET_HEADER_HEIGHT, SET_SEARCH_QUERY, SET_USER_DATA, SET_USER_ID, SHOW_CONTACTS_LOADER, SHOW_MOBILE_PREVIEW } from "./types";

const initialState = {
    isLogged: false,
    loginLoader: false,
    contactsLoader: false,
    userData: {},
    userID: "",
    isCookie: false,
    phoneContacts: [],
    selectedUser: {},
    searchQuery: "",
    contactImage: "",
    mobilePreview: false,
    isMobile: false,
    headerHeight: ""
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
        case SET_COOKIE_STATE:
            return {...state, isCookie: true};
        case CLEAR_COOKIE_STATE:
            return {...state, isCookie: false};
        case GET_PHONE_CONTACTS: 
            return {...state, phoneContacts: action.payload};
        case CLEAR_PHONE_CONTACTS:
            return {...state, phoneContacts: []};
        case SELECT_USER_CONTACT:
            return {...state, selectedUser: action.payload};
        case CLEAR_USER_CONTACT:
                return {...state, selectedUser: {}};
        case SET_SEARCH_QUERY:
            return {...state, searchQuery: action.payload};
        case CLEAR_SEARCH_QUERY:
            return {...state, searchQuery: ""};
        case GET_CONTACT_IMAGE:
            return {...state, contactImage: action.payload};
        case CLEAR_CONTACT_IMAGE:
            return {...state, contactImage: ""};
        case SHOW_CONTACTS_LOADER:
            return {...state, contactsLoader: true};
        case HIDE_CONTACTS_LOADER:
            return {...state, contactsLoader: false};
        case SHOW_MOBILE_PREVIEW:
            return {...state, mobilePreview: true};
        case HIDE_MOBILE_PREVIEW:
            return {...state, mobilePreview: false};
        case IS_MOBILE:
            return {...state, isMobile: action.payload};
        case SET_HEADER_HEIGHT:
            return {...state, headerHeight: action.payload};
        default: return state;
    };
};


export default appReducer;