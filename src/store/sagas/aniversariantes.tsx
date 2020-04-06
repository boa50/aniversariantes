import axios from 'axios';
import { put } from 'redux-saga/effects';
import {
    setAniversariantes,
    setAniversariantesDia,
    setMes,
} from '../actions/aniversariantes';
import AniversariantesUtils from '../../utils/aniversariantesUtils';
import DateUtils from '../../utils/dateUtils';

export function* initAniversariantesSaga() {
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

        yield put(setMes(DateUtils.getMesAtual()));
    } catch (error) {
        console.log(error);
    }
}
