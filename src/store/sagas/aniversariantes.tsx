import axios from 'axios';
import { put } from 'redux-saga/effects';
import { getAniversariantes } from '../actions/aniversariantes';
import { Aniversariante } from '../../models/Aniversariante';

type Action = {
    type: string;
    aniversariantes: Aniversariante[];
};

export function* getAniversariantesSaga(action: Action) {
    try {
        const response = yield axios.get(
            'https://firestore.googleapis.com/v1/projects/aniversariantes-a287d/databases/(default)/documents/aniversariantes?pageSize=200',
        );

        const aniversariantes = response.data.documents.map(
            (aniversariante: any) => {
                return {
                    pessoa: aniversariante.fields.pessoa.stringValue,
                    mes: aniversariante.fields.mes.stringValue,
                    dia: aniversariante.fields.dia.stringValue,
                };
            },
        );

        yield put(getAniversariantes(aniversariantes));
    } catch (error) {
        console.log(error);
    }
}
