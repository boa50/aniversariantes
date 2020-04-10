import axios from 'axios';
import { put } from 'redux-saga/effects';
import { AniversariantesAction } from '../../models/AniversariantesAction';
import { setAniversariantes } from '../actions/aniversariantes';

export function* initAniversariantesSaga(action: AniversariantesAction) {
    const baseUrl = 'https://firestore.googleapis.com/v1/projects';
    const url = `${baseUrl}/${process.env.PROJECT}/databases/(default)/documents/familias/${action.idFamilia}/aniversariantes?pageSize=200`;

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

        yield put(setAniversariantes(aniversariantes));
    } catch (error) {
        console.log(error);
    }
}
