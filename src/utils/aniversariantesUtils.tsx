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

    getAniversariantesShare: (
        aniversariantes: Aniversariante[],
        mes: number,
    ): String => {
        const titulo =
            'Aniversariantes do Mês de ' +
            DateUtils.getMonthNameFromNumber(mes) +
            ':\n';
        const corpo = aniversariantes
            .map(aniversariante => {
                return aniversariante.pessoa + ' - ' + aniversariante.dia;
            })
            .join('\n');

        return titulo + corpo;
    },
};

export default AniversariantesUtils;
