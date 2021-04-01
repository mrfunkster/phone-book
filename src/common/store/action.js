import history from "../components/history";
import base from "../components/firebase"
import { CLEAR_COOKIE_STATE, CLEAR_PHONE_CONTACTS, CLEAR_USER_CONTACT, CLEAR_USER_DATA, CLEAR_USER_ID, GET_PHONE_CONTACTS, LOGIN_HIDE_LOADER, LOGIN_SHOW_LOADER, LOG_IN, LOG_OUT, SELECT_USER_CONTACT, SET_COOKIE_STATE, SET_USER_DATA, SET_USER_ID } from "./types";
import Cookies from "js-cookie";

export const logIn = () => {
    return {
        type: LOG_IN
    };
};

export const logOutState = () => {
    return {
        type: LOG_OUT
    };
};

export const loginWithCookies = () => ({
    type: SET_COOKIE_STATE
});

export const clearCookiesState = () => ({
    type: CLEAR_COOKIE_STATE
});

export const setUserID = (payload) => {
    return {
        type: SET_USER_ID,
        payload
    };
};

export const clearUserID = () => {
    return {
        type: CLEAR_USER_ID
    };
};

export const setUserData = (payload) => {
    return {
        type: SET_USER_DATA,
        payload
    };
};

export const clearUserData = () => {
    return {
        type: CLEAR_USER_DATA
    };
};

export const showLoginLoader = () => ({
    type: LOGIN_SHOW_LOADER
});

export const hideLoginLoader = () => ({
    type: LOGIN_HIDE_LOADER
});

export const getPhoneContacts = (payload) => {
    return {
        type: GET_PHONE_CONTACTS,
        payload
    };
};

export const clearPhoneContacts = () => {
    return {
        type: CLEAR_PHONE_CONTACTS
    };
};

export const selectUserContact = payload => {
    return {
        type: SELECT_USER_CONTACT,
        payload
    };
};

export const clearUserContact = () => ({
    type: CLEAR_USER_CONTACT
});

export const authWithEmailAndPassword = (formData) => {
    return async dispatch => {
        try {
            dispatch(showLoginLoader());
            await base.auth().signInWithEmailAndPassword(formData.email, formData.password)
                .then(cred => {
                    let userID = cred.user.uid;
                    return base.database().ref('users/' + userID).get()
                        .then(snapshot => {
                            if(snapshot.exists()) {
                                let userData = snapshot.val();
                                let phoneContacts = Object.values(userData.userPhoneBook ? userData.userPhoneBook : {});
                                dispatch(setUserData(userData ? userData : {}));
                                dispatch(setUserID(userID.length ? userID : ""));
                                dispatch(getPhoneContacts(phoneContacts));
                                if(formData.rememberMe) {
                                    Cookies.set('userInfo', {
                                        email: userData.userInfo.email,
                                        password: userData.userInfo.password
                                    }, {expires: 7});
                                };
                                dispatch(clearCookiesState());
                                dispatch(hideLoginLoader());
                                dispatch(logIn());
                                history.push('/');
                            } else {
                                console.log('No Data available!');
                                dispatch(hideLoginLoader());
                                dispatch(clearCookiesState());
                            };
                        });
                });
        } catch (error) {
            console.log(error.code);
            alert(error.message);
            dispatch(clearCookiesState());
            dispatch(hideLoginLoader());
            if(Cookies.get('userInfo')) {
                Cookies.remove('userInfo');
            };
        };
    };
};

export const registerWithByEmailAndPassword = (formData) => {
    return async dispatch => {
        try {
            dispatch(showLoginLoader());
            await base.auth().createUserWithEmailAndPassword(formData.email, formData.password)
                .then(cred => {
                    let userID = cred.user.uid;
                    const userData = {
                        userInfo: {
                            email: formData.email,
                            password: formData.password
                        },
                        userPhoneBook : {}
                    };
                    return base.database().ref('users/' + userID).set(userData)
                        .then(() => {
                            let phoneContacts = Object.values(userData.userPhoneBook ? userData.userPhoneBook : {});
                            dispatch(setUserID(userID));
                            dispatch(setUserData(userData));
                            dispatch(getPhoneContacts(phoneContacts));
                            dispatch(clearUserContact());
                            Cookies.set('userInfo', {
                                email: userData.userInfo.email,
                                password: userData.userInfo.password
                            }, {expires: 7});
                            dispatch(hideLoginLoader());
                            dispatch(logIn());
                            history.push('/account');
                        });
                });
        } catch (error) {
            console.log(error.code);
            alert(error.message);
            dispatch(hideLoginLoader());
        };
    };
};

export const logOut = () => {
    return async dispatch => {
        try {
            dispatch(showLoginLoader());
            await base.auth().signOut()
                .then(() => {
                    dispatch(clearUserID());
                    dispatch(clearUserData());
                    dispatch(hideLoginLoader());
                    dispatch(logOutState());
                    dispatch(clearPhoneContacts());
                    if(Cookies.get('userInfo')) {
                        Cookies.remove('userInfo');
                    };
                    history.push('/login');
                })
        } catch (error) {
            console.log(error.code);
            alert(error.message);
            dispatch(hideLoginLoader());
        };
    };
};