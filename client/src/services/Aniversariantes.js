import aniversariantes from '../assests/aniversariantes';

const AniversariantesService = {
    ListaAniversariantes: () => {
        return aniversariantes
    },

    ListaAniversariantesMes: mesNumero => {
        return AniversariantesService.ListaAniversariantes()
            .filter(aniversariante => {
                return aniversariante.mes === mesNumero.toString();
            });
    }
}
export default AniversariantesService;