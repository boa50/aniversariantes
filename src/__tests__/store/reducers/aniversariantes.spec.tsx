import reducer from '../../../store/reducers/aniversariantes';
import * as actionTypes from '../../../store/actions/actionsTypes';
import { AniversariantesAction } from '../../../models/AniversariantesAction';
import { AniversariantesStateReducer } from '../../../models/AniversariantesState';

jest.mock('../../../utils/dateUtils', () => {
    return {
        getMesAtual: () => 10,
        getDiaAtual: () => 22,
        getMes(data: Date): number {
            return data.getMonth() + 1;
        },
        getDia(data: Date): number {
            return data.getDate();
        },
    };
});

const initState: AniversariantesStateReducer = {
    aniversariantes: [],
    aniversariantesMes: [],
    aniversariantesDia: [],
    mes: 10,
    loading: true,
    error: '',
};

const defaultAction: AniversariantesAction = {
    type: '',
    aniversariantes: [],
    mes: 0,
    idFamilia: '',
    error: '',
};

const aniversariantesMock = [
    { pessoa: 'mariazinha', nascimento: new Date('2000-10-22T03:00:00Z') },
    { pessoa: 'pedinho', nascimento: new Date('2000-10-25T03:00:00Z') },
    { pessoa: 'joãozinho', nascimento: new Date('2000-10-22T03:00:00Z') },
    { pessoa: 'testinho', nascimento: new Date('2000-11-26T03:00:00Z') },
];

describe('AniversariantesReducer', () => {
    test('verifica o correto estado inicial', () => {
        const action: AniversariantesAction = {
            ...defaultAction,
        };
        expect(reducer(undefined, action)).toEqual({
            ...initState,
        });
    });

    test('verifica o SET_MES_INFO', () => {
        const newState: AniversariantesStateReducer = {
            ...initState,
            aniversariantes: aniversariantesMock,
        };

        const action: AniversariantesAction = {
            ...defaultAction,
            type: actionTypes.SET_MES_INFO,
            aniversariantes: aniversariantesMock,
            mes: 11,
        };

        expect(reducer(newState, action)).toEqual({
            ...newState,
            aniversariantesMes: [
                {
                    pessoa: 'testinho',
                    nascimento: new Date('2000-11-26T03:00:00Z'),
                },
            ],
            mes: 11,
        });
    });

    test('verifica o FETCH_ANIVERSARIANTES_START', () => {
        const newState: AniversariantesStateReducer = {
            ...initState,
            aniversariantes: aniversariantesMock,
            aniversariantesMes: aniversariantesMock,
            aniversariantesDia: aniversariantesMock,
            mes: 1,
            loading: false,
            error: 'algum erro',
        };

        const action: AniversariantesAction = {
            ...defaultAction,
            type: actionTypes.FETCH_ANIVERSARIANTES_START,
        };

        expect(reducer(newState, action)).toEqual({
            ...initState,
            mes: 1,
        });
    });

    test('verifica o FETCH_ANIVERSARIANTES_SUCCESS', () => {
        const action: AniversariantesAction = {
            ...defaultAction,
            type: actionTypes.FETCH_ANIVERSARIANTES_SUCCESS,
            aniversariantes: aniversariantesMock,
        };

        expect(reducer(initState, action)).toEqual({
            ...initState,
            aniversariantes: aniversariantesMock,
            aniversariantesMes: [
                {
                    pessoa: 'joãozinho',
                    nascimento: new Date('2000-10-22T03:00:00Z'),
                },
                {
                    pessoa: 'mariazinha',
                    nascimento: new Date('2000-10-22T03:00:00Z'),
                },
                {
                    pessoa: 'pedinho',
                    nascimento: new Date('2000-10-25T03:00:00Z'),
                },
            ],
            aniversariantesDia: [
                {
                    pessoa: 'joãozinho',
                    nascimento: new Date('2000-10-22T03:00:00Z'),
                },
                {
                    pessoa: 'mariazinha',
                    nascimento: new Date('2000-10-22T03:00:00Z'),
                },
            ],
            loading: false,
        });
    });

    test('verifica o FETCH_ANIVERSARIANTES_FAIL', () => {
        const mockError = 'jumentão branco';
        const action: AniversariantesAction = {
            ...defaultAction,
            type: actionTypes.FETCH_ANIVERSARIANTES_FAIL,
            error: mockError,
        };

        expect(reducer(initState, action)).toEqual({
            ...initState,
            error: mockError,
            loading: false,
        });
    });
});
