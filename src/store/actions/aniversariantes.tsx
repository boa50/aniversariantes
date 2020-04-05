import * as actionTypes from './actionsTypes';
import { Aniversariante } from '../../models/Aniversariante';

export const getAniversariantes = (aniversariantes: Aniversariante[]) => {
    return {
        type: actionTypes.GET_ANIVERSARIANTES,
        aniversariantes,
    };
};

export const getAniversariantesMes = (
    aniversariantes: Aniversariante[],
    mes: number,
) => {
    return {
        type: actionTypes.GET_ANIVERSARIANTES_MES,
        aniversariantes,
        mes,
    };
};

export const getAniversariantesDia = (aniversariantes: Aniversariante[]) => {
    return {
        type: actionTypes.GET_ANIVERSARIANTES_DIA,
        aniversariantes,
    };
};
