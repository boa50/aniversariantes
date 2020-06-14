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
                const pessoaMes: number = DateUtils.getMes(
                    aniversariante.nascimento,
                );
                return pessoaMes === mes;
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
                const pessoaMes: number = DateUtils.getMes(
                    aniversariante.nascimento,
                );
                const pessoaDia: number = DateUtils.getDia(
                    aniversariante.nascimento,
                );

                return pessoaMes === mesAtual && pessoaDia === diaAtual;
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
                const pessoaDia: number = DateUtils.getDia(
                    aniversariante.nascimento,
                );

                return aniversariante.pessoa + ' - ' + pessoaDia;
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
                const aDia: number = DateUtils.getDia(a.nascimento);
                const bDia: number = DateUtils.getDia(b.nascimento);

                if (aDia < bDia) {
                    return -1;
                } else if (aDia === bDia) {
                    return a.pessoa.localeCompare(b.pessoa);
                } else {
                    return 1;
                }
            },
        );
    },
};

export default AniversariantesUtils;
