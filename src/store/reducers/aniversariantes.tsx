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
    idFamilia: '',
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

const setAniversariantesMes = (state: AniversariantesState) => {
    const aniversariantesMes = AniversariantesUtils.getAniversariantesMes(
        state.aniversariantes,
        state.mes,
    );

    return {
        ...state,
        aniversariantesMes,
    };
};

const setAniversariantesDia = (state: AniversariantesState) => {
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

const setIdFamilia = (
    state: AniversariantesState,
    action: AniversariantesAction,
) => {
    return {
        ...state,
        idFamilia: action.idFamilia,
    };
};

const reducer = (state = initState, action: AniversariantesAction) => {
    switch (action.type) {
        case actionTypes.SET_ANIVERSARIANTES:
            return setAniversariantes(state, action);
        case actionTypes.SET_ANIVERSARIANTES_MES:
            return setAniversariantesMes(state);
        case actionTypes.SET_ANIVERSARIANTES_DIA:
            return setAniversariantesDia(state);
        case actionTypes.SET_MES_INFO:
            return setMesInfo(state, action);
        case actionTypes.SET_ID_FAMILIA:
            return setIdFamilia(state, action);
        default:
            return state;
    }
};

export default reducer;
