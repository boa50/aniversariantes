import * as actionTypes from '../actions/actionsTypes';
import { Aniversariante } from '../../models/Aniversariante';
import { AniversariantesState } from '../../models/AniversariantesState';
import AniversariantesUtils from '../../utils/aniversariantesUtils';

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

const setAniversariantesDia = (state: AniversariantesState, action: Action) => {
    return {
        ...state,
        aniversariantesDia: action.aniversariantes,
    };
};

const setMes = (state: AniversariantesState, action: Action) => {
    const aniversariantesMes = AniversariantesUtils.getAniversariantesMes(
        state.aniversariantes,
        action.mes,
    );

    return {
        ...state,
        aniversariantesMes,
        mes: action.mes,
    };
};

const reducer = (state = initState, action: Action) => {
    switch (action.type) {
        case actionTypes.SET_ANIVERSARIANTES:
            return setAniversariantes(state, action);
        case actionTypes.SET_ANIVERSARIANTES_DIA:
            return setAniversariantesDia(state, action);
        case actionTypes.SET_MES:
            return setMes(state, action);
        default:
            return state;
    }
};

export default reducer;
