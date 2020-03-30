import axios from 'axios';

import { Aniversariante } from '../models/Aniversariante';

let aniversariantesCache: Aniversariante[] = [];

const AniversariantesService = {
    getAniversariantes: async (): Promise<Aniversariante[]> => {
        if (aniversariantesCache.length > 0) {
            return AniversariantesService.getAniversariantesCache();
        }
        return AniversariantesService.getAniversariantesServer();
    },

    getAniversariantesCache: async (): Promise<Aniversariante[]> => {
        return new Promise<Aniversariante[]>((resolve, reject) => {
            resolve(aniversariantesCache);
        });
    },

    getAniversariantesServer: async (): Promise<Aniversariante[]> => {
        return axios
            .get(
                'https://firestore.googleapis.com/v1/projects/aniversariantes-a287d/databases/(default)/documents/aniversariantes?pageSize=200',
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

                aniversariantesCache = aniversariantes;
                return aniversariantes;
            })
            .catch(error => {
                console.log(error);
                return [];
            });
    },
};
export default AniversariantesService;
