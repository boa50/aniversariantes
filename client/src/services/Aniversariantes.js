import aniversariantes from '../assets/aniversariantes';
import DateUtils from '../utils/DateUtils';

const AniversariantesService = {
    ListaAniversariantes: () => {
        return aniversariantes
    },

    ListaAniversariantesMes: mes => {
        return AniversariantesService.ListaAniversariantes()
            .filter(aniversariante => {
                return Number(aniversariante.mes) === mes;
            });
    },

    ListaAniversariantesDia: () => {
        const mesAtual = DateUtils.getMesAtual();
        const diaAtual = DateUtils.getDiaAtual();

        return AniversariantesService.ListaAniversariantes()
            .filter(aniversariante => {
                return (Number(aniversariante.mes) === mesAtual)
                    && (Number(aniversariante.dia) === diaAtual);
            });
    }
}
export default AniversariantesService;