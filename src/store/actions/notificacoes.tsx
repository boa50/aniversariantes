import * as actionTypes from './actionsTypes';

export const subscreve = (idFamilia: string, tokenDestino: string) => {
    return {
        type: actionTypes.NOTIFICACOES_SUBSCREVE,
        idFamilia,
        tokenDestino,
    };
};
