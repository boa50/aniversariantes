import * as actions from '../../../store/actions/auth';
import * as actionsTypes from '../../../store/actions/actionsTypes';

describe('AuthActions', () => {
    test('cria a action para initAuth', () => {
        const mockIdFamilia = 'mockIdFamilia';
        const expectedAction = {
            type: actionsTypes.INIT_AUTH,
            idFamilia: mockIdFamilia,
        };

        expect(actions.initAuth(mockIdFamilia)).toEqual(expectedAction);
    });

    test('cria a action para authStart', () => {
        const expectedAction = {
            type: actionsTypes.AUTH_START,
        };

        expect(actions.authStart()).toEqual(expectedAction);
    });

    test('cria a action para authSuccess', () => {
        const mockIdFamilia = 'mockIdFamilia';
        const mockFamiliaNome = 'mockFamiliaNome';
        const expectedAction = {
            type: actionsTypes.AUTH_SUCCESS,
            idFamilia: mockIdFamilia,
            familiaNome: mockFamiliaNome,
        };

        expect(actions.authSuccess(mockIdFamilia, mockFamiliaNome)).toEqual(
            expectedAction,
        );
    });

    test('cria a action para authFail', () => {
        const error = 'erro do jumentinho';
        const expectedAction = {
            type: actionsTypes.AUTH_FAIL,
            error: error,
        };

        expect(actions.authFail(error)).toEqual(expectedAction);
    });

    test('cria a action para checkIdFamilia', () => {
        const expectedAction = {
            type: actionsTypes.AUTH_CHECK_STATE,
        };

        expect(actions.authCheckState()).toEqual(expectedAction);
    });

    test('cria a action para initLogout', () => {
        const expectedAction = {
            type: actionsTypes.INIT_LOGOUT,
        };

        expect(actions.initLogout()).toEqual(expectedAction);
    });

    test('cria a action para logoutComplete', () => {
        const expectedAction = {
            type: actionsTypes.LOGOUT_COMPLETE,
        };

        expect(actions.logoutComplete()).toEqual(expectedAction);
    });
});
