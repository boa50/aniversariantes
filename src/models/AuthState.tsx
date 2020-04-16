export type AuthState = {
    auth: AuthStateReducer;
};

export type AuthStateReducer = {
    loading: boolean;
    idFamilia: string;
    error: string;
};
