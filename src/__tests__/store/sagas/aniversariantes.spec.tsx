import axios from '../../../axios';
import { AniversariantesAction } from '../../../models/AniversariantesAction';
import { initAniversariantesSaga } from '../../../store/sagas/aniversariantes';
import {
    fetchAniversariantesStart,
    fetchAniversariantesSuccess,
    fetchAniversariantesFail,
} from '../../../store/actions';

import { executeSaga } from '../../testUtils';

const mocks: jest.SpyInstance[] = [];
afterEach(() => {
    mocks.forEach((mock: jest.SpyInstance) => {
        mock.mockClear();
    });
    mocks.length = 0;
});

const aniversariantesMock = [
    {
        idPessoa: 'algumId',
        pessoa: 'oi',
        nascimento: new Date('2000-01-02T03:00:00Z'),
        idPai: '',
        idMae: '',
    },
];

const actionMock: AniversariantesAction = {
    type: '',
    aniversariantes: [],
    mes: 0,
    idFamilia: '',
    error: '',
};

describe('AniversariantesSaga', () => {
    test('verifica se os actions foram chamados corretamente', async () => {
        const responseMock = {
            data: {
                documents: [
                    {
                        name:
                            'asdas/asdasd/asdasd/' +
                            aniversariantesMock[0].idPessoa,
                        fields: {
                            pessoa: {
                                stringValue: aniversariantesMock[0].pessoa,
                            },
                            nascimento: {
                                timestampValue:
                                    aniversariantesMock[0].nascimento,
                            },
                        },
                    },
                ],
            },
        };
        const fetchAniversariantes = jest
            .spyOn(axios, 'get')
            .mockImplementation(() => Promise.resolve(responseMock));
        mocks.push(fetchAniversariantes);

        const dispatched = await executeSaga(
            initAniversariantesSaga,
            actionMock,
        );

        expect(fetchAniversariantes).toHaveBeenCalledTimes(1);
        expect(dispatched).toEqual([
            fetchAniversariantesStart(),
            fetchAniversariantesSuccess(aniversariantesMock),
        ]);
    });

    test('verifica se deu erro na chamada da api', async () => {
        const mockError = 'mockError';
        const fetchAniversariantes = jest
            .spyOn(axios, 'get')
            .mockImplementation(() => Promise.reject(mockError));
        mocks.push(fetchAniversariantes);

        const dispatched = await executeSaga(
            initAniversariantesSaga,
            actionMock,
        );

        await expect(fetchAniversariantes).toHaveBeenCalledTimes(1);
        expect(dispatched).toEqual([
            fetchAniversariantesStart(),
            fetchAniversariantesFail(mockError),
        ]);
    });
});
