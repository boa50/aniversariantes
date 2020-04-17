import * as actionTypes from './actionsTypes';

export const initAuth = (idFamilia: string) => {
    return {
        type: actionTypes.INIT_AUTH,
        idFamilia,
    };
};

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START,
    };
};

export const authSuccess = (idFamilia: string) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idFamilia,
    };
};

export const authFail = (error: string) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error,
    };
};

export const checkIdFamilia = () => {
    return {
        type: actionTypes.CHECK_ID_FAMILIA,
    };
};

export const initLogout = () => {
    return {
        type: actionTypes.INIT_LOGOUT,
    };
};

export const logoutComplete = () => {
    return {
        type: actionTypes.LOGOUT_COMPLETE,
    };
};
