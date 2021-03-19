import * as actionTypes from '../actions/actionsTypes';
import { PessoaAtualizaStateReducer } from '../../models/PessoaAtualizaState';
import { PessoaAtualizaAction } from '../../models/PessoaAtualizaAction';

const initState: PessoaAtualizaStateReducer = {
    loading: false,
    pessoa: '',
    error: '',
};

const atualizaStart = (state: PessoaAtualizaStateReducer) => {
    return {
        ...state,
        loading: true,
        pessoa: '',
        error: '',
    };
};

const atualizaSuccess = (
    state: PessoaAtualizaStateReducer,
    action: PessoaAtualizaAction,
) => {
    return {
        ...state,
        loading: false,
        pessoa: action.aniversariante.pessoa,
        error: '',
    };
};

const atualizaFail = (
    state: PessoaAtualizaStateReducer,
    action: PessoaAtualizaAction,
) => {
    return {
        ...state,
        loading: false,
        pessoa: '',
        error: action.error,
    };
};

const reducer = (state = initState, action: PessoaAtualizaAction) => {
    switch (action.type) {
        case actionTypes.PESSOA_ATUALIZA_START:
            return atualizaStart(state);
        case actionTypes.PESSOA_ATUALIZA_SUCCESS:
            return atualizaSuccess(state, action);
        case actionTypes.PESSOA_ATUALIZA_FAIL:
            return atualizaFail(state, action);
        default:
            return state;
    }
};

export default reducer;
