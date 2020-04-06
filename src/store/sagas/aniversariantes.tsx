import axios from 'axios';
import { put } from 'redux-saga/effects';
import {
    setAniversariantes,
    setAniversariantesDia,
} from '../actions/aniversariantes';
import { Aniversariante } from '../../models/Aniversariante';
import AniversariantesUtils from '../../utils/aniversariantesUtils';

type Action = {
    type: string;
    aniversariantes: Aniversariante[];
};

export function* initAniversariantesSaga(action: Action) {
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

        yield put(setAniversariantes(aniversariantes));

        const aniversariantesDia = yield AniversariantesUtils.getAniversariantesDia(
            aniversariantes,
        );
        yield put(setAniversariantesDia(aniversariantesDia));
    } catch (error) {
        console.log(error);
    }
}
