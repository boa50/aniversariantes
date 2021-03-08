import { Aniversariante } from '../../models/Aniversariante';
import * as actionTypes from './actionsTypes';

export const initAtualiza = (
    idFamilia: string,
    aniversariante: Aniversariante,
) => {
    return {
        type: actionTypes.INIT_PESSOA_ATUALIZA,
        idFamilia,
        aniversariante,
    };
};

export const atualizaStart = () => {
    return {
        type: actionTypes.PESSOA_ATUALIZA_START,
    };
};

export const atualizaSuccess = (aniversariante: { pessoa: string }) => {
    return {
        type: actionTypes.PESSOA_ATUALIZA_SUCCESS,
        aniversariante,
    };
};

export const atualizaFail = (error: string) => {
    return {
        type: actionTypes.PESSOA_ATUALIZA_FAIL,
        error,
    };
};
