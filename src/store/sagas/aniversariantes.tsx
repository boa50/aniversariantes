import axios from '../../axios';
import { put } from 'redux-saga/effects';
import { AniversariantesAction } from '../../models/AniversariantesAction';
import * as actions from '../actions';
import DbUtils from '../../utils/dbUtils';

import { Aniversariante } from '../../models/Aniversariante';

export function* initAniversariantesSaga(action: AniversariantesAction) {
    yield put(actions.fetchAniversariantesStart());
    const token = yield localStorage.getItem('token');
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const url = `${action.idFamilia}/aniversariantes?pageSize=200`;

    try {
        const response = yield axios.get(url, config);

        const aniversariantes: Aniversariante[] = response.data.documents.map(
            (aniversariante: any) => {
                const idPessoa: string = DbUtils.getDocumentId(aniversariante);
                const pessoa: string = DbUtils.getAniversarianteNome(
                    aniversariante,
                );
                const nascimento: Date = DbUtils.getAniversarianteNascimento(
                    aniversariante,
                );
                const idPai: string = DbUtils.getIdPais(aniversariante, 'pai');
                const idMae: string = DbUtils.getIdPais(aniversariante, 'mae');

                return {
                    idPessoa: idPessoa,
                    pessoa: pessoa,
                    nascimento: nascimento,
                    idPai: idPai,
                    idMae: idMae,
                };
            },
        );

        yield put(actions.fetchAniversariantesSuccess(aniversariantes));
    } catch (error) {
        yield put(actions.fetchAniversariantesFail(error));
    }
}
