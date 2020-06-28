import reducer from '../../../store/reducers/pessoaCadastro';
import * as actionTypes from '../../../store/actions/actionsTypes';
import { PessoaCadastroStateReducer } from '../../../models/PessoaCadastroState';
import { PessoaCadastroAction } from '../../../models/PessoaCadastroAction';

const initState: PessoaCadastroStateReducer = {
    pessoa: '',
    error: '',
};

const defaultAction: PessoaCadastroAction = {
    type: '',
    idFamilia: '',
    pessoa: '',
    nascimento: new Date('2000-01-02T03:00:00Z'),
    error: '',
};

describe('PessoaCadastroReducer', () => {
    test('verifica o correto estado inicial', () => {
        expect(reducer(undefined, defaultAction)).toEqual({
            ...initState,
        });
    });

    test('verifica o PESSOA_CADASTRO_START', () => {
        const newState: PessoaCadastroStateReducer = {
            ...initState,
            pessoa: '',
            error: '',
        };

        const action: PessoaCadastroAction = {
            ...defaultAction,
            type: actionTypes.PESSOA_CADASTRO_START,
        };

        expect(reducer(newState, action)).toEqual({
            ...newState,
        });
    });

    test('verifica o PESSOA_CADASTRO_SUCCESS', () => {
        const pessoaMock = 'jumento';

        const newState: PessoaCadastroStateReducer = {
            ...initState,
            pessoa: pessoaMock,
            error: '',
        };

        const action: PessoaCadastroAction = {
            ...defaultAction,
            type: actionTypes.PESSOA_CADASTRO_SUCCESS,
            pessoa: pessoaMock,
        };

        expect(reducer(newState, action)).toEqual({
            ...newState,
        });
    });

    test('verifica o PESSOA_CADASTRO_FAIL', () => {
        const errorMock = 'errorMock';

        const newState: PessoaCadastroStateReducer = {
            ...initState,
            pessoa: '',
            error: 'errorMock',
        };

        const action: PessoaCadastroAction = {
            ...defaultAction,
            type: actionTypes.PESSOA_CADASTRO_FAIL,
            pessoa: 'jumento branco',
            error: errorMock,
        };

        expect(reducer(newState, action)).toEqual({
            ...newState,
        });
    });
});
