import { runSaga } from 'redux-saga';
import axios from '../../../axios';
import { AuthAction } from '../../../models/AuthAction';
import {
    initAuthSaga,
    checkIdFamiliaSaga,
    initLogoutSaga,
} from '../../../store/sagas/auth';
import {
    authStart,
    authSuccess,
    authFail,
    logoutComplete,
} from '../../../store/actions';

const actionMock: AuthAction = {
    type: '',
    idFamilia: '',
    familiaNome: '',
    error: '',
};

describe('AuthSaga', () => {
    test('verifica initAuthSaga com sucesso', async () => {
        const mockIdFamilia = 'mockIdFamilia';
        const mockFamiliaNome = 'mockFamiliaNome';

        const responseMock = {
            data: { fields: { nome: { stringValue: mockFamiliaNome } } },
        };
        const fetchFamilia = jest
            .spyOn(axios, 'get')
            .mockImplementation(() => Promise.resolve(responseMock));

        Storage.prototype.setItem = jest.fn((a: string, b: string) => true);

        const newActionMock: AuthAction = {
            ...actionMock,
            idFamilia: mockIdFamilia,
        };

        const dispatched: any = [];
        await runSaga(
            {
                dispatch: action => dispatched.push(action),
            },
            initAuthSaga,
            newActionMock,
        );

        expect(fetchFamilia).toHaveBeenCalledTimes(1);
        expect(Storage.prototype.setItem).toHaveBeenCalledTimes(1);
        expect(dispatched).toEqual([
            authStart(),
            authSuccess(mockIdFamilia, mockFamiliaNome),
        ]);

        fetchFamilia.mockClear();
    });

    test('verifica initAuthSaga com erro 404', async () => {
        const errorMessage = 'Código não existente!';
        const mockError = { response: { data: { error: { code: 404 } } } };
        const fetchFamilia = jest
            .spyOn(axios, 'get')
            .mockImplementation(() => Promise.reject(mockError));

        const dispatched: any = [];
        await runSaga(
            {
                dispatch: action => dispatched.push(action),
            },
            initAuthSaga,
            actionMock,
        );

        expect(fetchFamilia).toHaveBeenCalledTimes(1);
        expect(dispatched).toEqual([authStart(), authFail(errorMessage)]);

        fetchFamilia.mockClear();
    });

    test('verifica initAuthSaga com erro qualquer', async () => {
        const errorMessage = 'alguma mensagem de jumento';
        const mockError = {
            response: {
                data: { error: { code: 0 } },
                statusText: errorMessage,
            },
        };
        const fetchFamilia = jest
            .spyOn(axios, 'get')
            .mockImplementation(() => Promise.reject(mockError));

        const dispatched: any = [];
        await runSaga(
            {
                dispatch: action => dispatched.push(action),
            },
            initAuthSaga,
            actionMock,
        );

        expect(fetchFamilia).toHaveBeenCalledTimes(1);
        expect(dispatched).toEqual([authStart(), authFail(errorMessage)]);

        fetchFamilia.mockClear();
    });

    test('verifica checkIdFamiliaSaga com sucesso', async () => {
        const mockIdFamilia = 'mockIdFamilia';
        const mockFamiliaNome = 'mockFamiliaNome';

        const responseMock = {
            data: { fields: { nome: { stringValue: mockFamiliaNome } } },
        };
        const fetchFamilia = jest
            .spyOn(axios, 'get')
            .mockImplementation(() => Promise.resolve(responseMock));

        Storage.prototype.getItem = jest.fn((a: string) => mockIdFamilia);

        const dispatched: any = [];
        await runSaga(
            {
                dispatch: action => dispatched.push(action),
            },
            checkIdFamiliaSaga,
        );

        expect(fetchFamilia).toHaveBeenCalledTimes(1);
        expect(Storage.prototype.getItem).toHaveBeenCalledTimes(1);
        expect(dispatched).toEqual([
            authStart(),
            authSuccess(mockIdFamilia, mockFamiliaNome),
        ]);

        fetchFamilia.mockClear();
    });

    test('verifica checkIdFamiliaSaga com erro', async () => {
        Storage.prototype.getItem = jest.fn((a: string) => '');

        const dispatched: any = [];
        await runSaga(
            {
                dispatch: action => dispatched.push(action),
            },
            checkIdFamiliaSaga,
        );

        expect(Storage.prototype.getItem).toHaveBeenCalledTimes(1);
        expect(dispatched).toEqual([authStart(), authFail('')]);
    });

    test('verifica initLogoutSaga', async () => {
        Storage.prototype.removeItem = jest.fn((a: string) => true);

        const dispatched: any = [];
        await runSaga(
            {
                dispatch: action => dispatched.push(action),
            },
            initLogoutSaga,
        );

        expect(Storage.prototype.removeItem).toHaveBeenCalledTimes(1);
        expect(dispatched).toEqual([logoutComplete()]);
    });
});
