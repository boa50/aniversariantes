import { runSaga, Saga } from 'redux-saga';
import axios from '../../../axios';
import axiosRaw from 'axios';
import { AuthAction } from '../../../models/AuthAction';
import {
    initAuthSaga,
    authCheckStateSaga,
    initLogoutSaga,
} from '../../../store/sagas/auth';
import {
    authStart,
    authSuccess,
    authFail,
    logoutComplete,
    initLogout,
    initAuth,
} from '../../../store/actions';

const mocks: jest.SpyInstance[] = [];

afterEach(() => {
    mocks.forEach((mock: jest.SpyInstance) => {
        mock.mockClear();
    });
    mocks.length = 0;
});

const actionMock: AuthAction = {
    type: '',
    idFamilia: '',
    familiaNome: '',
    error: '',
};

const mockFamiliaNome = 'mockFamiliaNome';
const mockIdFamilia = 'mockIdFamilia';
const mockToken = 'mockToken';
let amanha = new Date();
amanha.setDate(amanha.getDate() + 1);
const dataAtual = amanha.toString();
const dataPassada = '1900-01-01';

const axiosMock = (
    authSuccess = true,
    fetchSucces = true,
    errorCode = 404,
    errorStatusText = '',
) => {
    let getToken;
    let fetchFamilia;

    const error = {
        response: {
            data: { error: { code: errorCode } },
            statusText: errorStatusText,
        },
    };

    if (authSuccess) {
        const response = {
            data: { expiresIn: 1000, idToken: mockToken },
        };
        getToken = jest
            .spyOn(axiosRaw, 'post')
            .mockImplementation(() => Promise.resolve(response));
    } else {
        getToken = jest
            .spyOn(axiosRaw, 'post')
            .mockImplementation(() => Promise.reject(error));
    }

    if (fetchSucces) {
        const response = {
            data: { fields: { nome: { stringValue: mockFamiliaNome } } },
        };
        fetchFamilia = jest
            .spyOn(axios, 'get')
            .mockImplementation(() => Promise.resolve(response));
    } else {
        fetchFamilia = jest
            .spyOn(axios, 'get')
            .mockImplementation(() => Promise.reject(error));
    }

    mocks.push(getToken);
    mocks.push(fetchFamilia);

    return { getToken, fetchFamilia };
};

const executeSaga = async (saga: Saga<any[]>, action = actionMock) => {
    const dispatched: any = [];
    await runSaga(
        {
            dispatch: action => dispatched.push(action),
        },
        saga,
        action,
    );

    return dispatched;
};

const mockGetItem = (token: string, idFamilia: string, data: string) => {
    const arr: string[] = [];

    Storage.prototype.getItem = jest.fn((a: string) => {
        if ('token' === a) {
            arr.push(token);
            return token;
        } else if ('idFamilia' === a) {
            arr.push(idFamilia);
            return idFamilia;
        } else if ('expirationDate' === a) {
            arr.push(data);
            return data;
        } else {
            return 'dadoInvalido';
        }
    });

    return arr;
};

describe('AuthSaga', () => {
    test('verifica initAuthSaga com sucesso', async () => {
        const { getToken, fetchFamilia } = axiosMock();

        Storage.prototype.setItem = jest.fn((a: string, b: string) => true);

        const newActionMock: AuthAction = {
            ...actionMock,
            idFamilia: mockIdFamilia,
        };

        const dispatched = await executeSaga(initAuthSaga, newActionMock);

        await expect(getToken).toHaveBeenCalledTimes(1);
        await expect(fetchFamilia).toHaveBeenCalledTimes(1);
        expect(Storage.prototype.setItem).toHaveBeenCalledTimes(3);
        expect(dispatched).toEqual([
            authStart(),
            authSuccess(mockIdFamilia, mockFamiliaNome),
        ]);
    });

    test('verifica initAuthSaga com erro 404', async () => {
        const errorMessage = 'Código não existente!';
        const { getToken, fetchFamilia } = axiosMock(true, false);

        const dispatched = await executeSaga(initAuthSaga);

        await expect(getToken).toHaveBeenCalledTimes(1);
        await expect(fetchFamilia).toHaveBeenCalledTimes(1);
        expect(dispatched).toEqual([authStart(), authFail(errorMessage)]);
    });

    test('verifica initAuthSaga com erro qualquer', async () => {
        const errorMessage = 'alguma mensagem de jumento';
        const { getToken, fetchFamilia } = axiosMock(
            true,
            false,
            401,
            errorMessage,
        );

        const dispatched = await executeSaga(initAuthSaga);

        await expect(getToken).toHaveBeenCalledTimes(1);
        await expect(fetchFamilia).toHaveBeenCalledTimes(1);
        expect(dispatched).toEqual([authStart(), authFail(errorMessage)]);
    });

    test('verifica authCheckStateSaga com sucesso', async () => {
        const { fetchFamilia } = axiosMock();

        const expectedArr = [mockToken, mockIdFamilia, dataAtual];
        const arr = mockGetItem(mockToken, mockIdFamilia, dataAtual);

        const dispatched = await executeSaga(authCheckStateSaga);

        await expect(fetchFamilia).toHaveBeenCalledTimes(1);
        expect(Storage.prototype.getItem).toHaveBeenCalledTimes(3);
        expect(expectedArr).toEqual(arr);
        expect(dispatched).toEqual([
            authStart(),
            authSuccess(mockIdFamilia, mockFamiliaNome),
        ]);
    });

    test('verifica authCheckStateSaga sem id da familia', async () => {
        const expectedArr = [mockToken, ''];
        const arr = mockGetItem(mockToken, '', dataAtual);

        const dispatched = await executeSaga(authCheckStateSaga);

        expect(Storage.prototype.getItem).toHaveBeenCalledTimes(2);
        expect(expectedArr).toEqual(arr);
        expect(dispatched).toEqual([authStart(), initLogout()]);
    });

    test('verifica authCheckStateSaga sem token', async () => {
        const expectedArr = ['', mockIdFamilia];
        const arr = mockGetItem('', mockIdFamilia, dataAtual);

        const dispatched = await executeSaga(authCheckStateSaga);

        expect(Storage.prototype.getItem).toHaveBeenCalledTimes(2);
        expect(expectedArr).toEqual(arr);
        expect(dispatched).toEqual([authStart(), initAuth(mockIdFamilia)]);
    });

    test('verifica authCheckStateSaga com token expirado', async () => {
        const expectedArr = [mockToken, mockIdFamilia, dataPassada];
        const arr = mockGetItem(mockToken, mockIdFamilia, dataPassada);

        const dispatched = await executeSaga(authCheckStateSaga);

        expect(Storage.prototype.getItem).toHaveBeenCalledTimes(3);
        expect(expectedArr).toEqual(arr);
        expect(dispatched).toEqual([authStart(), initAuth(mockIdFamilia)]);
    });

    test('verifica initLogoutSaga', async () => {
        Storage.prototype.removeItem = jest.fn((a: string) => true);

        const dispatched = await executeSaga(initLogoutSaga);

        expect(Storage.prototype.removeItem).toHaveBeenCalledTimes(3);
        expect(dispatched).toEqual([logoutComplete()]);
    });
});
