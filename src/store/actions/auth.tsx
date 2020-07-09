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

export const authSuccess = (idFamilia: string, familiaNome: string) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idFamilia,
        familiaNome,
    };
};

export const authFail = (error: string) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error,
    };
};

export const authCheckState = () => {
    return {
        type: actionTypes.AUTH_CHECK_STATE,
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
