import { runSaga } from 'redux-saga';
import axios from 'axios';
import { initAniversariantesSaga } from '../../../store/sagas/aniversariantes';
import {
    setAniversariantes,
    setAniversariantesMes,
    setAniversariantesDia,
} from '../../../store/actions/aniversariantes';

let aniversariantesMock = [
    {
        pessoa: 'oi',
        mes: '1',
        dia: '02',
    },
];

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
        );

        expect(fetchAniversariantes).toHaveBeenCalledTimes(1);
        expect(dispatched).toContainEqual(
            setAniversariantes(aniversariantesMock),
        );
        expect(dispatched).toContainEqual(setAniversariantesMes());
        expect(dispatched).toContainEqual(setAniversariantesDia());

        fetchAniversariantes.mockClear();
    });

    test('verifica se deu erro na chamada da api', async () => {
        const fetchAniversariantes = jest
            .spyOn(axios, 'get')
            .mockImplementation(() => Promise.reject());

        const dispatched: any = [];
        await runSaga(
            {
                dispatch: action => dispatched.push(action),
            },
            initAniversariantesSaga,
        );

        expect(fetchAniversariantes).toHaveBeenCalledTimes(1);
        expect(dispatched).toEqual([]);
    });
});
