import axios from '../../../axios';
import { NotificacaoAction } from '../../../models/NotificacaoAction';
import { subscreveSaga } from '../../../store/sagas/notificacoes';

import { executeSaga } from '../../testUtils';

const mocks: jest.SpyInstance[] = [];

afterEach(() => {
    mocks.forEach((mock: jest.SpyInstance) => {
        mock.mockClear();
    });
    mocks.length = 0;
});

const mockTokenDestino = 'mockTokenDestino';
const actionMock: NotificacaoAction = {
    type: '',
    idFamilia: 'mockIdFamilia',
    tokenDestino: mockTokenDestino,
};

const mockNotificadosResponse = {
    data: {
        documents: [
            {
                fields: {
                    tokenDestino: {
                        stringValue: `${mockTokenDestino}diferente`,
                    },
                },
            },
        ],
    },
};

const mockFunctions = (
    notificadosResponse: {},
    resolveNotificados = true,
    postResponse = {},
    resolveToken = true,
) => {
    Storage.prototype.getItem = jest.fn((a: string) => 'mockToken');

    let getNotificados;
    let postToken;

    if (resolveNotificados) {
        getNotificados = jest
            .spyOn(axios, 'get')
            .mockImplementation(() => Promise.resolve(notificadosResponse));
    } else {
        getNotificados = jest
            .spyOn(axios, 'get')
            .mockImplementation(() => Promise.reject(notificadosResponse));
    }

    if (resolveToken) {
        postToken = jest
            .spyOn(axios, 'post')
            .mockImplementation(() => Promise.resolve());
    } else {
        postToken = jest
            .spyOn(axios, 'post')
            .mockImplementation(() => Promise.reject(postResponse));
    }

    const consoleError = jest
        .spyOn(global.console, 'error')
        .mockImplementation(() => null);

    mocks.push(getNotificados);
    mocks.push(postToken);
    mocks.push(consoleError);

    return { getNotificados, postToken, consoleError };
};

describe('NotificacoesSaga', () => {
    test('verifica a subscrição com sucesso', async () => {
        const { getNotificados, postToken, consoleError } = mockFunctions(
            mockNotificadosResponse,
        );

        const dispatched = await executeSaga(subscreveSaga, actionMock);

        expect(Storage.prototype.getItem).toHaveBeenCalledTimes(1);
        await expect(getNotificados).toHaveBeenCalledTimes(1);
        await expect(postToken).toHaveBeenCalledTimes(1);
        expect(consoleError).not.toHaveBeenCalled();

        expect(dispatched).toEqual([]);
    });

    test('verifica a não subscrição de tokenDestino já existente', async () => {
        const notificadosResponse = {
            data: {
                documents: [
                    {
                        fields: {
                            tokenDestino: {
                                stringValue: `${mockTokenDestino}`,
                            },
                        },
                    },
                ],
            },
        };

        const { getNotificados, postToken, consoleError } = mockFunctions(
            notificadosResponse,
        );

        const dispatched = await executeSaga(subscreveSaga, actionMock);

        expect(Storage.prototype.getItem).toHaveBeenCalledTimes(1);
        await expect(getNotificados).toHaveBeenCalledTimes(1);
        await expect(postToken).not.toHaveBeenCalled();
        expect(consoleError).not.toHaveBeenCalled();

        expect(dispatched).toEqual([]);
    });

    test('verifica a subscrição com erro na busca de notificados no banco', async () => {
        const notificadosResponse = {
            response: {
                data: {
                    error: {
                        message: 'alguma message',
                    },
                },
            },
        };

        const { getNotificados, postToken, consoleError } = mockFunctions(
            notificadosResponse,
            false,
        );

        const dispatched = await executeSaga(subscreveSaga, actionMock);

        expect(Storage.prototype.getItem).toHaveBeenCalledTimes(1);
        await expect(getNotificados).toHaveBeenCalledTimes(1);
        await expect(postToken).toHaveBeenCalledTimes(1);
        expect(consoleError).toHaveBeenCalledTimes(2);

        expect(dispatched).toEqual([]);
    });

    test('verifica erro de acesso ao banco na subscrição', async () => {
        const tokenResponse = {
            response: {
                data: {
                    error: {
                        message: 'alguma message',
                    },
                },
            },
        };

        const { getNotificados, postToken, consoleError } = mockFunctions(
            mockNotificadosResponse,
            true,
            tokenResponse,
            false,
        );

        const dispatched = await executeSaga(subscreveSaga, actionMock);

        expect(Storage.prototype.getItem).toHaveBeenCalledTimes(1);
        await expect(getNotificados).toHaveBeenCalledTimes(1);
        await expect(postToken).toHaveBeenCalledTimes(1);
        expect(consoleError).toHaveBeenCalledTimes(2);

        expect(dispatched).toEqual([]);
    });
});
