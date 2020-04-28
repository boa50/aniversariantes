import { runSaga } from 'redux-saga';
import axios from '../../../axios';
import { AniversariantesAction } from '../../../models/AniversariantesAction';
import { initAniversariantesSaga } from '../../../store/sagas/aniversariantes';
import {
    fetchAniversariantesStart,
    fetchAniversariantesSuccess,
    fetchAniversariantesFail,
} from '../../../store/actions';

let aniversariantesMock = [
    {
        pessoa: 'oi',
        mes: '1',
        dia: '02',
    },
];

const actionMock: AniversariantesAction = {
    type: '',
    aniversariantes: [],
    mes: 0,
    idFamilia: '',
    error: '',
};

let responseMock = {
    data: {
        documents: [
            {
                fields: {
                    pessoa: {
                        stringValue: aniversariantesMock[0].pessoa,
                    },
                    mes: {
                        stringValue: aniversariantesMock[0].mes,
                    },
                    dia: {
                        stringValue: aniversariantesMock[0].dia,
                    },
                },
            },
        ],
    },
};

describe('AniversariantesSaga', () => {
    test('verifica se os actions foram chamados corretamente', async () => {
        const fetchAniversariantes = jest
            .spyOn(axios, 'get')
            .mockImplementation(() => Promise.resolve(responseMock));

        const dispatched: any = [];
        await runSaga(
            {
                dispatch: action => dispatched.push(action),
            },
            initAniversariantesSaga,
            actionMock,
        );

        expect(fetchAniversariantes).toHaveBeenCalledTimes(1);
        expect(dispatched).toEqual([
            fetchAniversariantesStart(),
            fetchAniversariantesSuccess(aniversariantesMock),
        ]);

        fetchAniversariantes.mockClear();
    });

    test('verifica se deu erro na chamada da api', async () => {
        const mockError = 'mockError';
        const fetchAniversariantes = jest
            .spyOn(axios, 'get')
            .mockImplementation(() => Promise.reject(mockError));

        const dispatched: any = [];
        await runSaga(
            {
                dispatch: action => dispatched.push(action),
            },
            initAniversariantesSaga,
            actionMock,
        );

        expect(fetchAniversariantes).toHaveBeenCalledTimes(1);
        expect(dispatched).toEqual([
            fetchAniversariantesStart(),
            fetchAniversariantesFail(mockError),
        ]);

        fetchAniversariantes.mockClear();
    });
});
