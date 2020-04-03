import { List } from 'immutable';

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
        const corpo = AniversariantesUtils.ordenaPorDia(aniversariantes)
            .map(aniversariante => {
                return aniversariante.pessoa + ' - ' + aniversariante.dia;
            })
            .join('\n');

        return titulo + corpo;
    },

    ordenaPorDia: (aniversariantes: Aniversariante[]): List<Aniversariante> => {
        const listaAniversariantesOrdenada = List(aniversariantes);

        return listaAniversariantesOrdenada.sort(
            (a: Aniversariante, b: Aniversariante) => {
                return a.dia < b.dia ? -1 : 1;
            },
        );
    },
};

export default AniversariantesUtils;
