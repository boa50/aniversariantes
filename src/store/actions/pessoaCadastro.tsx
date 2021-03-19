import { Aniversariante } from '../../models/Aniversariante';
import * as actionTypes from './actionsTypes';

export const initCadastro = (
    idFamilia: string,
    aniversariante: Aniversariante,
) => {
    return {
        type: actionTypes.INIT_PESSOA_CADASTRO,
        idFamilia,
        aniversariante,
    };
};

export const cadastroStart = () => {
    return {
        type: actionTypes.PESSOA_CADASTRO_START,
    };
};

export const cadastroSuccess = (aniversariante: { pessoa: string }) => {
    return {
        type: actionTypes.PESSOA_CADASTRO_SUCCESS,
        aniversariante,
    };
};

export const cadastroFail = (error: string) => {
    return {
        type: actionTypes.PESSOA_CADASTRO_FAIL,
        error,
    };
};
