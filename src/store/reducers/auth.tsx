import * as actionTypes from '../actions/actionsTypes';
import { AuthStateReducer } from '../../models/AuthState';
import { AuthAction } from '../../models/AuthAction';

const initState: AuthStateReducer = {
    loading: true,
    idFamilia: '',
    familiaNome: '',
    error: '',
};

const authStart = (state: AuthStateReducer) => {
    return {
        ...state,
        idFamilia: '',
        familiaNome: '',
        error: '',
        loading: true,
    };
};

const authSuccess = (state: AuthStateReducer, action: AuthAction) => {
    return {
        ...state,
        idFamilia: action.idFamilia,
        familiaNome: action.familiaNome,
        loading: false,
    };
};

const authFail = (state: AuthStateReducer, action: AuthAction) => {
    return {
        ...state,
        error: action.error,
        loading: false,
    };
};

const logoutComplete = (state: AuthStateReducer) => {
    return {
        ...state,
        idFamilia: '',
        familiaNome: '',
    };
};

const reducer = (state = initState, action: AuthAction) => {
    switch (action.type) {
        case actionTypes.AUTH_START:
            return authStart(state);
        case actionTypes.AUTH_SUCCESS:
            return authSuccess(state, action);
        case actionTypes.AUTH_FAIL:
            return authFail(state, action);
        case actionTypes.LOGOUT_COMPLETE:
            return logoutComplete(state);
        default:
            return state;
    }
};

export default reducer;
