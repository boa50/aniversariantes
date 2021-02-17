import reducer from '../../../store/reducers/pessoaAtualiza';
import * as actionTypes from '../../../store/actions/actionsTypes';
import { PessoaAtualizaStateReducer } from '../../../models/PessoaAtualizaState';
import { PessoaAtualizaAction } from '../../../models/PessoaAtualizaAction';

const initState: PessoaAtualizaStateReducer = {
    loading: false,
    pessoa: '',
    error: '',
};

const defaultAction: PessoaAtualizaAction = {
    type: '',
    idFamilia: '',
    idPessoa: '',
    pessoa: '',
    nascimento: new Date(),
    error: '',
};

describe('PessoaAtualizaReducer', () => {
    test('verifica o correto estado inicial', () => {
        expect(reducer(undefined, defaultAction)).toEqual({ ...initState });
    });
    test('verifica o PESSOA_ATUALIZA_START', () => {
        const newState: PessoaAtualizaStateReducer = {
            ...initState,
            loading: true,
            pessoa: '',
            error: '',
        };

        const action: PessoaAtualizaAction = {
            ...defaultAction,
            type: actionTypes.PESSOA_ATUALIZA_START,
        };

        expect(reducer(initState, action)).toEqual({ ...newState });
    });
    test('verifica o PESSOA_ATUALIZA_SUCCESS', () => {
        const pessoaMock = 'Alguma pessoa diferente';

        const newState: PessoaAtualizaStateReducer = {
            ...initState,
            loading: false,
            pessoa: pessoaMock,
            error: '',
        };

        const action: PessoaAtualizaAction = {
            ...defaultAction,
            type: actionTypes.PESSOA_ATUALIZA_SUCCESS,
            pessoa: pessoaMock,
        };

        expect(reducer(initState, action)).toEqual({ ...newState });
    });
    test('verifica o PESSOA_ATUALIZA_FAIL', () => {
        const errorMock = 'Algum erro bem esquisito';

        const newState: PessoaAtualizaStateReducer = {
            ...initState,
            loading: false,
            pessoa: '',
            error: errorMock,
        };

        const action: PessoaAtualizaAction = {
            ...defaultAction,
            type: actionTypes.PESSOA_ATUALIZA_FAIL,
            error: errorMock,
        };

        expect(reducer(initState, action)).toEqual({ ...newState });
    });
});
