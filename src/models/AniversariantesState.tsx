import { Aniversariante } from './Aniversariante';

export type AniversariantesState = {
    aniversariantes: Aniversariante[];
    aniversariantesMes: Aniversariante[];
    aniversariantesDia: Aniversariante[];
    mes: number;
    loading: boolean;
    idFamilia: string;
};
