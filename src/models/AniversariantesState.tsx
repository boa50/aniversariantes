import { Aniversariante } from './Aniversariante';

export type AniversariantesState = {
    aniversariantes: AniversariantesStateReducer;
};

export type AniversariantesStateReducer = {
    aniversariantes: Aniversariante[];
    aniversariantesMes: Aniversariante[];
    aniversariantesDia: Aniversariante[];
    mes: number;
    loading: boolean;
    error: string;
};
