import * as actionTypes from '../actions/actionsTypes';
import { Aniversariante } from '../../models/Aniversariante';
import { AniversariantesState } from '../../models/AniversariantesState';

type Action = {
    type: string;
    aniversariantes: Aniversariante[];
    mes: number;
};

const initState: AniversariantesState = {
    aniversariantes: [],
    aniversariantesMes: [],
    aniversariantesDia: [],
    mes: 0,
    loading: true,
};

const setAniversariantes = (state: AniversariantesState, action: Action) => {
    return {
        ...state,
        aniversariantes: action.aniversariantes,
        loading: false,
    };
};

const setAniversariantesMes = (state: AniversariantesState, action: Action) => {
    return {
        ...state,
        aniversariantesMes: action.aniversariantes,
    };
};

const setAniversariantesDia = (state: AniversariantesState, action: Action) => {
    return {
        ...state,
        aniversariantesDia: action.aniversariantes,
    };
};

const reducer = (state = initState, action: Action) => {
    switch (action.type) {
        case actionTypes.SET_ANIVERSARIANTES:
            return setAniversariantes(state, action);
        case actionTypes.SET_ANIVERSARIANTES_MES:
            return setAniversariantesMes(state, action);
        case actionTypes.SET_ANIVERSARIANTES_DIA:
            return setAniversariantesDia(state, action);
        default:
            return state;
    }
};

export default reducer;
