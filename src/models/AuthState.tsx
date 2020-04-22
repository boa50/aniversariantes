export type AuthState = {
    auth: AuthStateReducer;
};

export type AuthStateReducer = {
    loading: boolean;
    idFamilia: string;
    familiaNome: string;
    error: string;
};
