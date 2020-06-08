import { Aniversariante } from './Aniversariante';

export type AniversariantesAction = {
    type: string;
    aniversariantes: Aniversariante[];
    mes: number;
    idFamilia: string;
    error: string;
};
