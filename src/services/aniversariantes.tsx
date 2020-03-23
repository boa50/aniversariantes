import aniversariantes from '../assets/aniversariantes';
import DateUtils from '../utils/dateUtils';
import { Aniversariante } from '../models/Aniversariante';

const AniversariantesService = {
    getListaAniversariantes: (): Aniversariante[] => {
        return aniversariantes;
    },

    getListaAniversariantesMes: (mes: number): Aniversariante[] => {
        return AniversariantesService.getListaAniversariantes().filter(
            aniversariante => {
                return Number(aniversariante.mes) === mes;
            },
        );
    },

    getListaAniversariantesDia: (): Aniversariante[] => {
        const mesAtual = DateUtils.getMesAtual();
        const diaAtual = DateUtils.getDiaAtual();

        return AniversariantesService.getListaAniversariantes().filter(
            aniversariante => {
                return (
                    Number(aniversariante.mes) === mesAtual &&
                    Number(aniversariante.dia) === diaAtual
                );
            },
        );
    },
};
export default AniversariantesService;
