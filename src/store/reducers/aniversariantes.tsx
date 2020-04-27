import * as actionTypes from '../actions/actionsTypes';
import { AniversariantesStateReducer } from '../../models/AniversariantesState';
import { AniversariantesAction } from '../../models/AniversariantesAction';
import AniversariantesUtils from '../../utils/aniversariantesUtils';
import DateUtils from '../../utils/dateUtils';

const initState: AniversariantesStateReducer = {
    aniversariantes: [],
    aniversariantesMes: [],
    aniversariantesDia: [],
    mes: DateUtils.getMesAtual(),
    loading: true,
    error: '',
};

const setMesInfo = (
    state: AniversariantesStateReducer,
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

const fetchAniversariantesStart = (state: AniversariantesStateReducer) => {
    return {
        ...state,
        aniversariantes: [],
        aniversariantesMes: [],
        aniversariantesDia: [],
        loading: true,
    };
};

const fetchAniversariantesSuccess = (
    state: AniversariantesStateReducer,
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

const fetchAniversariantesFail = (
    state: AniversariantesStateReducer,
    action: AniversariantesAction,
) => {
    return {
        ...state,
        error: action.error,
        loading: false,
    };
};

const reducer = (state = initState, action: AniversariantesAction) => {
    switch (action.type) {
        case actionTypes.SET_MES_INFO:
            return setMesInfo(state, action);
        case actionTypes.FETCH_ANIVERSARIANTES_START:
            return fetchAniversariantesStart(state);
        case actionTypes.FETCH_ANIVERSARIANTES_SUCCESS:
            return fetchAniversariantesSuccess(state, action);
        case actionTypes.FETCH_ANIVERSARIANTES_FAIL:
            return fetchAniversariantesFail(state, action);
        default:
            return state;
    }
};

export default reducer;
