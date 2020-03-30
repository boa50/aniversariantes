import DateUtils from './dateUtils';
import { Aniversariante } from '../models/Aniversariante';

const AniversariantesUtils = {
    getAniversariantesMes: (
        aniversariantes: Aniversariante[],
        mes: number,
    ): Aniversariante[] => {
        return aniversariantes.filter(aniversariante => {
            return Number(aniversariante.mes) === mes;
        });
    },

    getAniversariantesDia: (
        aniversariantes: Aniversariante[],
    ): Aniversariante[] => {
        const mesAtual = DateUtils.getMesAtual();
        const diaAtual = DateUtils.getDiaAtual();

        return aniversariantes.filter(aniversariante => {
            return (
                Number(aniversariante.mes) === mesAtual &&
                Number(aniversariante.dia) === diaAtual
            );
        });
    },
};

export default AniversariantesUtils;
