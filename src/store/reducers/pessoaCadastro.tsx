import * as actionTypes from '../actions/actionsTypes';
import { PessoaCadastroStateReducer } from '../../models/PessoaCadastroState';
import { PessoaCadastroAction } from '../../models/PessoaCadastroAction';

const initState: PessoaCadastroStateReducer = {
    pessoa: '',
    error: '',
};

const cadastroStart = (state: PessoaCadastroStateReducer) => {
    return {
        ...state,
        pessoa: '',
        error: '',
    };
};

const cadastroSuccess = (
    state: PessoaCadastroStateReducer,
    action: PessoaCadastroAction,
) => {
    return {
        ...state,
        pessoa: action.pessoa,
        error: '',
    };
};

const cadastroFail = (
    state: PessoaCadastroStateReducer,
    action: PessoaCadastroAction,
) => {
    return {
        ...state,
        pessoa: '',
        error: action.error,
    };
};

const reducer = (state = initState, action: PessoaCadastroAction) => {
    switch (action.type) {
        case actionTypes.PESSOA_CADASTRO_START:
            return cadastroStart(state);
        case actionTypes.PESSOA_CADASTRO_SUCCESS:
            return cadastroSuccess(state, action);
        case actionTypes.PESSOA_CADASTRO_FAIL:
            return cadastroFail(state, action);
        default:
            return state;
    }
};

export default reducer;