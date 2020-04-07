import { List } from 'immutable';

import { Aniversariante } from '../models/Aniversariante';
import DateUtils from './dateUtils';

const AniversariantesUtils = {
    getAniversariantesMes: (
        aniversariantes: Aniversariante[],
        mes: number,
    ): Aniversariante[] => {
        return AniversariantesUtils.ordenaPorDiaNome(aniversariantes)
            .toArray()
            .filter(aniversariante => {
                return Number(aniversariante.mes) === mes;
            });
    },

    getAniversariantesDia: (
        aniversariantes: Aniversariante[],
    ): Aniversariante[] => {
        const mesAtual = DateUtils.getMesAtual();
        const diaAtual = DateUtils.getDiaAtual();

        return AniversariantesUtils.ordenaPorDiaNome(aniversariantes)
            .toArray()
            .filter(aniversariante => {
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
        const corpo = AniversariantesUtils.ordenaPorDiaNome(aniversariantes)
            .map(aniversariante => {
                return aniversariante.pessoa + ' - ' + aniversariante.dia;
            })
            .join('\n');

        return titulo + corpo;
    },

    ordenaPorDiaNome: (
        aniversariantes: Aniversariante[],
    ): List<Aniversariante> => {
        const listaAniversariantesOrdenada = List(aniversariantes);

        return listaAniversariantesOrdenada.sort(
            (a: Aniversariante, b: Aniversariante) => {
                if (a.dia < b.dia) {
                    return -1;
                } else if (a.dia === b.dia) {
                    return a.pessoa.localeCompare(b.pessoa);
                } else {
                    return 1;
                }
            },
        );
    },
};

export default AniversariantesUtils;
