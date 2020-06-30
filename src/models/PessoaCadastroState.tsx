export type PessoaCadastroState = {
    pessoaCadastro: PessoaCadastroStateReducer;
};

export type PessoaCadastroStateReducer = {
    pessoa: string;
    error: string;
};
