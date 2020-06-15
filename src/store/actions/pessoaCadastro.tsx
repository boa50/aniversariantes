import * as actionTypes from './actionsTypes';

export const initCadastro = (
    idFamilia: string,
    pessoa: string,
    nascimento: Date,
) => {
    return {
        type: actionTypes.INIT_PESSOA_CADASTRO,
        idFamilia,
        pessoa,
        nascimento,
    };
};

export const cadastroStart = () => {
    return {
        type: actionTypes.PESSOA_CADASTRO_START,
    };
};

export const cadastroSuccess = (pessoa: string) => {
    return {
        type: actionTypes.PESSOA_CADASTRO_SUCCESS,
        pessoa,
    };
};

export const cadastroFail = (error: string) => {
    return {
        type: actionTypes.PESSOA_CADASTRO_FAIL,
        error,
    };
};
