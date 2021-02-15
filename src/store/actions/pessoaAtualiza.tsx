import * as actionTypes from './actionsTypes';

export const initAtualiza = (
    idFamilia: string,
    idPessoa: string,
    pessoa: string,
    nascimento: Date,
) => {
    return {
        type: actionTypes.INIT_PESSOA_ATUALIZA,
        idFamilia,
        idPessoa,
        pessoa,
        nascimento,
    };
};

export const atualizaStart = () => {
    return {
        type: actionTypes.PESSOA_ATUALIZA_START,
    };
};

export const atualizaSuccess = (pessoa: string) => {
    return {
        type: actionTypes.PESSOA_ATUALIZA_SUCCESS,
        pessoa,
    };
};

export const atualizaFail = (error: string) => {
    return {
        type: actionTypes.PESSOA_ATUALIZA_FAIL,
        error,
    };
};
