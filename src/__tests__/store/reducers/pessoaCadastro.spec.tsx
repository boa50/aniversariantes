import reducer from '../../../store/reducers/pessoaCadastro';
import * as actionTypes from '../../../store/actions/actionsTypes';
import { PessoaCadastroStateReducer } from '../../../models/PessoaCadastroState';
import { PessoaCadastroAction } from '../../../models/PessoaCadastroAction';
import { Aniversariante } from '../../../models/Aniversariante';

const initState: PessoaCadastroStateReducer = {
    loading: false,
    pessoa: '',
    error: '',
};

const defaultAction: PessoaCadastroAction = {
    type: '',
    idFamilia: '',
    aniversariante: {
        idPessoa: '',
        pessoa: '',
        nascimento: new Date('2000-01-02T03:00:00Z'),
    } as Aniversariante,
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
            loading: true,
            pessoa: '',
            error: '',
        };

        const action: PessoaCadastroAction = {
            ...defaultAction,
            type: actionTypes.PESSOA_CADASTRO_START,
        };

        expect(reducer(initState, action)).toEqual({
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
            aniversariante: {
                ...defaultAction.aniversariante,
                pessoa: pessoaMock,
            },
        };

        expect(reducer(initState, action)).toEqual({
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
            aniversariante: {
                ...defaultAction.aniversariante,
                pessoa: 'jumento branco',
            },
            error: errorMock,
        };

        expect(reducer(initState, action)).toEqual({
            ...newState,
        });
    });
});
