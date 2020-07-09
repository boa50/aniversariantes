import axios from '../../axios';
import { put } from 'redux-saga/effects';
import { AniversariantesAction } from '../../models/AniversariantesAction';
import * as actions from '../actions';

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

        const aniversariantes = response.data.documents.map(
            (aniversariante: any) => {
                const nascimento: string =
                    aniversariante.fields.nascimento.timestampValue;
                const dtNascimento: Date = new Date(nascimento);

                return {
                    pessoa: aniversariante.fields.pessoa.stringValue,
                    nascimento: dtNascimento,
                };
            },
        );

        yield put(actions.fetchAniversariantesSuccess(aniversariantes));
    } catch (error) {
        yield put(actions.fetchAniversariantesFail(error));
    }
}
