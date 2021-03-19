import { Aniversariante } from './Aniversariante';

export type PessoaCadastroAction = {
    type: string;
    idFamilia: string;
    aniversariante: Aniversariante;
    error: string;
};
