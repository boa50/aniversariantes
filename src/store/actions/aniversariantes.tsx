import * as actionTypes from './actionsTypes';
import { Aniversariante } from '../../models/Aniversariante';

export const initAniversariantes = (idFamilia: string) => {
    return {
        type: actionTypes.INIT_ANIVERSARIANTES,
        idFamilia,
    };
};

export const setMesInfo = (mes: number) => {
    return {
        type: actionTypes.SET_MES_INFO,
        mes,
    };
};

export const fetchAniversariantesStart = () => {
    return {
        type: actionTypes.FETCH_ANIVERSARIANTES_START,
    };
};

export const fetchAniversariantesSuccess = (
    aniversariantes: Aniversariante[],
) => {
    return {
        type: actionTypes.FETCH_ANIVERSARIANTES_SUCCESS,
        aniversariantes,
    };
};

export const fetchAniversariantesFail = (error: string) => {
    return {
        type: actionTypes.FETCH_ANIVERSARIANTES_FAIL,
        error,
    };
};
