export type PessoaCadastroState = {
    pessoaCadastro: PessoaCadastroStateReducer;
};

export type PessoaCadastroStateReducer = {
    loading: boolean;
    pessoa: string;
    error: string;
};
