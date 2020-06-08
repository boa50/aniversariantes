import reducer from '../../../store/reducers/auth';
import * as actionTypes from '../../../store/actions/actionsTypes';
import { AuthAction } from '../../../models/AuthAction';
import { AuthStateReducer } from '../../../models/AuthState';

const initState: AuthStateReducer = {
    loading: true,
    idFamilia: '',
    familiaNome: '',
    error: '',
};

const defaultAction: AuthAction = {
    type: '',
    idFamilia: '',
    familiaNome: '',
    error: '',
};

describe('AuthReducer', () => {
    test('verifica o correto estado inicial', () => {
        const action: AuthAction = {
            ...defaultAction,
        };
        expect(reducer(undefined, action)).toEqual({
            ...initState,
        });
    });

    test('verifica o AUTH_START', () => {
        const newState: AuthStateReducer = {
            ...initState,
            loading: false,
            idFamilia: 'algum',
            familiaNome: 'outro',
            error: 'jumento',
        };

        const action: AuthAction = {
            ...defaultAction,
            type: actionTypes.AUTH_START,
        };

        expect(reducer(newState, action)).toEqual({
            ...initState,
            loading: true,
            idFamilia: '',
            familiaNome: '',
            error: '',
        });
    });

    test('verifica o AUTH_SUCCESS', () => {
        const mockIdFamilia = 'mockIdFamilia';
        const mockFamiliaNome = 'mockFamiliaNome';

        const action: AuthAction = {
            ...defaultAction,
            type: actionTypes.AUTH_SUCCESS,
            idFamilia: mockIdFamilia,
            familiaNome: mockFamiliaNome,
        };

        expect(reducer(initState, action)).toEqual({
            ...initState,
            loading: false,
            idFamilia: mockIdFamilia,
            familiaNome: mockFamiliaNome,
        });
    });

    test('verifica o AUTH_FAIL', () => {
        const error = 'jumentinho';

        const action: AuthAction = {
            ...defaultAction,
            type: actionTypes.AUTH_FAIL,
            error: error,
        };

        expect(reducer(initState, action)).toEqual({
            ...initState,
            loading: false,
            error: error,
        });
    });

    test('verifica o LOGOUT_COMPLETE', () => {
        const newState: AuthStateReducer = {
            ...initState,
            idFamilia: 'algum',
            familiaNome: 'outro',
        };

        const action: AuthAction = {
            ...defaultAction,
            type: actionTypes.LOGOUT_COMPLETE,
        };

        expect(reducer(newState, action)).toEqual({
            ...initState,
            idFamilia: '',
            familiaNome: '',
        });
    });
});
