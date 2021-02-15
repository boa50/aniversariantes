export type PessoaAtualizaAction = {
    type: string;
    idFamilia: string;
    idPessoa: string;
    pessoa: string;
    nascimento: Date;
    error: string;
};
