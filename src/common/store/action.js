import history from "../components/history";
import { LOG_IN, LOG_OUT } from "./types";

export const logOut = () => {
    history.push('/login');
    return {
        type: LOG_OUT
    };
};

export const logIn = () => {
    history.push('/');
    return {
        type: LOG_IN
    };
};