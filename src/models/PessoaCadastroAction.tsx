export type PessoaCadastroAction = {
    type: string;
    idFamilia: string;
    pessoa: string;
    nascimento: Date;
    error: string;
};
