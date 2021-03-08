import { Aniversariante } from './Aniversariante';

export type PessoaAtualizaAction = {
    type: string;
    idFamilia: string;
    aniversariante: Aniversariante;
    error: string;
};
