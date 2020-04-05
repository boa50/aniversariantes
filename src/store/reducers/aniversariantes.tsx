import * as actionTypes from '../actions/actionsTypes';
import { Aniversariante } from '../../models/Aniversariante';

type Action = {
    type: string;
    aniversariantes: Aniversariante[];
    mes: number;
};

type State = {
    aniversariantes: Aniversariante[];
    aniversariantesMes: Aniversariante[];
    aniversariantesDia: Aniversariante[];
};

const initState: State = {
    aniversariantes: [],
    aniversariantesMes: [],
    aniversariantesDia: [],
};

const getAniversariantes = (state: State, action: Action) => {
    return {
        ...state,
        aniversariantes: action.aniversariantes,
    };
};

const getAniversariantesMes = (state: State, action: Action) => {
    return {
        ...state,
        aniversariantes: action.aniversariantes,
    };
};

const getAniversariantesDia = (state: State, action: Action) => {
    return {
        ...state,
        aniversariantes: action.aniversariantes,
    };
};

const reducer = (state = initState, action: Action) => {
    switch (action.type) {
        case actionTypes.GET_ANIVERSARIANTES:
            return getAniversariantes(state, action);
        case actionTypes.GET_ANIVERSARIANTES_MES:
            return getAniversariantesMes(state, action);
        case actionTypes.GET_ANIVERSARIANTES_DIA:
            return getAniversariantesDia(state, action);
        default:
            return state;
    }
};

export default reducer;
