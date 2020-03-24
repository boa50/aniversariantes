import axios from 'axios';

import DateUtils from '../utils/dateUtils';
import { Aniversariante } from '../models/Aniversariante';

const AniversariantesService = {
    getListaAniversariantes: async (): Promise<Aniversariante[]> => {
        return axios
            .get(
                'https://firestore.googleapis.com/v1/projects/aniversariantes-a287d/databases/(default)/documents/aniversariantes',
            )
            .then(response => {
                const aniversariantes = response.data.documents.map(
                    (aniversariante: any) => {
                        return {
                            pessoa: aniversariante.fields.pessoa.stringValue,
                            mes: aniversariante.fields.mes.stringValue,
                            dia: aniversariante.fields.dia.stringValue,
                        };
                    },
                );
                return aniversariantes;
            })
            .catch(error => {
                console.log(error);
                return [];
            });
    },

    getListaAniversariantesMes: async (
        mes: number,
    ): Promise<Aniversariante[]> => {
        return AniversariantesService.getListaAniversariantes().then(
            aniversariantes => {
                return aniversariantes.filter(aniversariante => {
                    return Number(aniversariante.mes) === mes;
                });
            },
        );
    },

    getListaAniversariantesDia: async (): Promise<Aniversariante[]> => {
        const mesAtual = DateUtils.getMesAtual();
        const diaAtual = DateUtils.getDiaAtual();

        return AniversariantesService.getListaAniversariantes().then(
            aniversariantes => {
                return aniversariantes.filter(aniversariante => {
                    return (
                        Number(aniversariante.mes) === mesAtual &&
                        Number(aniversariante.dia) === diaAtual
                    );
                });
            },
        );
    },
};
export default AniversariantesService;
