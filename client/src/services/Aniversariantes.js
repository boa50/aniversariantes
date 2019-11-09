import DateUtils from '../utils/DateUtils';
import aniversariantes from '../assests/aniversariantes';

const AniversariantesService = {
    ListaAniversariantes: () => {
        return aniversariantes
    },

    ListaAniversariantesMes: mesNumero => {
        return AniversariantesService.ListaAniversariantes()
            .filter(aniversariante => {
                return DateUtils.isDataDoMes(aniversariante.dia, mesNumero);
            });
    }
}
export default AniversariantesService;