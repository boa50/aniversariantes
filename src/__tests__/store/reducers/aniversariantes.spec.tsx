import reducer from '../../../store/reducers/aniversariantes';
import * as actionTypes from '../../../store/actions/actionsTypes';

jest.mock('../../../utils/dateUtils', () => {
    return {
        getMesAtual: () => 10,
        getDiaAtual: () => 22,
    };
});

let initState: any = {
    aniversariantes: [],
    aniversariantesMes: [],
    aniversariantesDia: [],
    mes: 10,
    loading: true,
};

const aniversariantesMock = [
    { pessoa: 'mariazinha', mes: '10', dia: '22' },
    { pessoa: 'pedinho', mes: '10', dia: '25' },
    { pessoa: 'joãozinho', mes: '10', dia: '22' },
    { pessoa: 'testinho', mes: '11', dia: '26' },
];

describe('AniversariantesReducer', () => {
    it('verifica o correto estado inicial', () => {
        const action = {
            type: '',
            aniversariantes: [],
            mes: 0,
        };
        expect(reducer(undefined, action)).toEqual({
            aniversariantes: [],
            aniversariantesMes: [],
            aniversariantesDia: [],
            mes: 10,
            loading: true,
        });
    });

    it('verifica o SET_ANIVERSARIANTES', () => {
        const action = {
            type: actionTypes.SET_ANIVERSARIANTES,
            aniversariantes: aniversariantesMock,
            mes: 0,
        };

        expect(reducer(initState, action)).toEqual({
            ...initState,
            aniversariantes: aniversariantesMock,
            loading: false,
        });
    });

    it('verifica o SET_ANIVERSARIANTES_MES', () => {
        initState = {
            aniversariantes: aniversariantesMock,
            aniversariantesMes: [],
            aniversariantesDia: [],
            mes: 10,
            loading: false,
        };

        const action = {
            type: actionTypes.SET_ANIVERSARIANTES_MES,
            aniversariantes: aniversariantesMock,
            mes: 0,
        };

        expect(reducer(initState, action)).toEqual({
            ...initState,
            aniversariantesMes: [
                { pessoa: 'joãozinho', mes: '10', dia: '22' },
                { pessoa: 'mariazinha', mes: '10', dia: '22' },
                { pessoa: 'pedinho', mes: '10', dia: '25' },
            ],
        });
    });

    it('verifica o SET_ANIVERSARIANTES_DIA', () => {
        initState = {
            aniversariantes: aniversariantesMock,
            aniversariantesMes: [],
            aniversariantesDia: [],
            mes: 10,
            loading: false,
        };

        const action = {
            type: actionTypes.SET_ANIVERSARIANTES_DIA,
            aniversariantes: aniversariantesMock,
            mes: 0,
        };

        expect(reducer(initState, action)).toEqual({
            ...initState,
            aniversariantesDia: [
                { pessoa: 'joãozinho', mes: '10', dia: '22' },
                { pessoa: 'mariazinha', mes: '10', dia: '22' },
            ],
        });
    });
});
