import axios from '../../axios';
import { put } from 'redux-saga/effects';
import { AniversariantesAction } from '../../models/AniversariantesAction';
import * as actions from '../actions';

export function* initAniversariantesSaga(action: AniversariantesAction) {
    yield put(actions.fetchAniversariantesStart());

    const url = `${action.idFamilia}/aniversariantes?pageSize=200`;

    try {
        const response = yield axios.get(url);

        const aniversariantes = response.data.documents.map(
            (aniversariante: any) => {
                return {
                    pessoa: aniversariante.fields.pessoa.stringValue,
                    mes: aniversariante.fields.mes.stringValue,
                    dia: aniversariante.fields.dia.stringValue,
                };
            },
        );

        yield put(actions.fetchAniversariantesSuccess(aniversariantes));
    } catch (error) {
        yield put(actions.fetchAniversariantesFail(error));
    }
}
