import reducer from '../../../store/reducers/aniversariantes';
import * as actionTypes from '../../../store/actions/actionsTypes';
import { AniversariantesAction } from '../../../models/AniversariantesAction';
import { AniversariantesStateReducer } from '../../../models/AniversariantesState';

jest.mock('../../../utils/dateUtils', () => {
    return {
        getMesAtual: () => 10,
        getDiaAtual: () => 22,
    };
});

let initState: AniversariantesStateReducer = {
    aniversariantes: [],
    aniversariantesMes: [],
    aniversariantesDia: [],
    mes: 10,
    loading: false,
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
    { pessoa: 'mariazinha', mes: '10', dia: '22' },
    { pessoa: 'pedinho', mes: '10', dia: '25' },
    { pessoa: 'joãozinho', mes: '10', dia: '22' },
    { pessoa: 'testinho', mes: '11', dia: '26' },
];

describe('AniversariantesReducer', () => {
    it('verifica o correto estado inicial', () => {
        const action: AniversariantesAction = {
            ...defaultAction,
        };
        expect(reducer(undefined, action)).toEqual({
            ...initState,
        });
    });

    it('verifica o SET_MES_INFO', () => {
        initState = {
            ...initState,
            aniversariantes: aniversariantesMock,
        };

        const action = {
            ...defaultAction,
            type: actionTypes.SET_MES_INFO,
            aniversariantes: aniversariantesMock,
            mes: 11,
        };

        expect(reducer(initState, action)).toEqual({
            ...initState,
            aniversariantesMes: [{ pessoa: 'testinho', mes: '11', dia: '26' }],
            mes: 11,
        });
    });
});
