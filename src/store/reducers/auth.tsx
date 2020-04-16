import * as actionTypes from '../actions/actionsTypes';
import { AuthStateReducer } from '../../models/AuthState';
import { AuthAction } from '../../models/AuthAction';

const initState: AuthStateReducer = {
    loading: true,
    idFamilia: '',
    error: '',
};

const authStart = (state: AuthStateReducer) => {
    return {
        ...state,
        idFamilia: '',
        error: '',
        loading: true,
    };
};

const authSuccess = (state: AuthStateReducer, action: AuthAction) => {
    return {
        ...state,
        idFamilia: action.idFamilia,
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

const reducer = (state = initState, action: AuthAction) => {
    switch (action.type) {
        case actionTypes.AUTH_START:
            return authStart(state);
        case actionTypes.AUTH_SUCCESS:
            return authSuccess(state, action);
        case actionTypes.AUTH_FAIL:
            return authFail(state, action);
        default:
            return state;
    }
};

export default reducer;
