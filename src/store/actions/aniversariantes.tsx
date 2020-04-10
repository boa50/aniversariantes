import * as actionTypes from './actionsTypes';
import { Aniversariante } from '../../models/Aniversariante';

export const initAniversariantes = (idFamilia: string) => {
    return {
        type: actionTypes.INIT_ANIVERSARIANTES,
        idFamilia,
    };
};

export const setAniversariantes = (aniversariantes: Aniversariante[]) => {
    return {
        type: actionTypes.SET_ANIVERSARIANTES,
        aniversariantes,
    };
};

export const setAniversariantesMes = () => {
    return {
        type: actionTypes.SET_ANIVERSARIANTES_MES,
    };
};

export const setAniversariantesDia = () => {
    return {
        type: actionTypes.SET_ANIVERSARIANTES_DIA,
    };
};

export const setMesInfo = (mes: number) => {
    return {
        type: actionTypes.SET_MES_INFO,
        mes,
    };
};
