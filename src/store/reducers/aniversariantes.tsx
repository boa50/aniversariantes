import * as actionTypes from '../actions/actionsTypes';
import { AniversariantesState } from '../../models/AniversariantesState';
import { AniversariantesAction } from '../../models/AniversariantesAction';
import AniversariantesUtils from '../../utils/aniversariantesUtils';
import DateUtils from '../../utils/dateUtils';

const initState: AniversariantesState = {
    aniversariantes: [],
    aniversariantesMes: [],
    aniversariantesDia: [],
    mes: DateUtils.getMesAtual(),
    loading: true,
};

const setAniversariantes = (
    state: AniversariantesState,
    action: AniversariantesAction,
) => {
    const aniversariantesMes = AniversariantesUtils.getAniversariantesMes(
        action.aniversariantes,
        state.mes,
    );
    const aniversariantesDia = AniversariantesUtils.getAniversariantesDia(
        action.aniversariantes,
    );

    return {
        ...state,
        aniversariantes: action.aniversariantes,
        aniversariantesMes,
        aniversariantesDia,
        loading: false,
    };
};

const setAniversariantesMes = (
    state: AniversariantesState,
    action: AniversariantesAction,
) => {
    const aniversariantesMes = AniversariantesUtils.getAniversariantesMes(
        state.aniversariantes,
        state.mes,
    );

    return {
        ...state,
        aniversariantesMes,
    };
};

const setAniversariantesDia = (
    state: AniversariantesState,
    action: AniversariantesAction,
) => {
    const aniversariantesDia = AniversariantesUtils.getAniversariantesDia(
        state.aniversariantes,
    );

    return {
        ...state,
        aniversariantesDia,
    };
};

const setMesInfo = (
    state: AniversariantesState,
    action: AniversariantesAction,
) => {
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

const reducer = (state = initState, action: AniversariantesAction) => {
    switch (action.type) {
        case actionTypes.SET_ANIVERSARIANTES:
            return setAniversariantes(state, action);
        case actionTypes.SET_ANIVERSARIANTES_MES:
            return setAniversariantesMes(state, action);
        case actionTypes.SET_ANIVERSARIANTES_DIA:
            return setAniversariantesDia(state, action);
        case actionTypes.SET_MES_INFO:
            return setMesInfo(state, action);
        default:
            return state;
    }
};

export default reducer;
