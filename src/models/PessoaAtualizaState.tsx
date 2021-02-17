export type PessoaAtualizaState = {
    pessoaAtualiza: PessoaAtualizaStateReducer;
};

export type PessoaAtualizaStateReducer = {
    loading: boolean;
    pessoa: string;
    error: string;
};
