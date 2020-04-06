import * as actionTypes from './actionsTypes';
import { Aniversariante } from '../../models/Aniversariante';

export const initAniversariantes = () => {
    return {
        type: actionTypes.INIT_ANIVERSARIANTES,
    };
};

export const setAniversariantes = (aniversariantes: Aniversariante[]) => {
    return {
        type: actionTypes.SET_ANIVERSARIANTES,
        aniversariantes,
    };
};

export const setAniversariantesDia = (aniversariantes: Aniversariante[]) => {
    return {
        type: actionTypes.SET_ANIVERSARIANTES_DIA,
        aniversariantes,
    };
};

export const setMes = (mes: number) => {
    return {
        type: actionTypes.SET_MES,
        mes,
    };
};
