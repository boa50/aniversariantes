import axios from '../../axios';
import { put } from 'redux-saga/effects';
import { PessoaCadastroAction } from '../../models/PessoaCadastroAction';
import * as actions from '../actions';
import DbUtils from '../../utils/dbUtils';

export function* initCadastroSaga(action: PessoaCadastroAction) {
    yield put(actions.cadastroStart());
    const token = yield localStorage.getItem('token');
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        const idFamilia = action.idFamilia;
        const url = idFamilia + '/aniversariantes/';
        const paiReference = DbUtils.mountReferenceField(
            axios.defaults.baseURL,
            idFamilia,
            action.aniversariante.idPai,
        );
        const maeReference = DbUtils.mountReferenceField(
            axios.defaults.baseURL,
            idFamilia,
            action.aniversariante.idMae,
        );

        const payload = {
            fields: {
                pessoa: {
                    stringValue: action.aniversariante.pessoa,
                },
                nascimento: {
                    timestampValue: action.aniversariante.nascimento,
                },
                pai: {
                    referenceValue: paiReference,
                },
                mae: {
                    referenceValue: maeReference,
                },
            },
        };

        const response = yield axios.post(url, payload, config);
        const pessoaCadastrada = response.data.fields.pessoa.stringValue;

        yield put(actions.cadastroSuccess({ pessoa: pessoaCadastrada }));
    } catch (error) {
        yield put(actions.cadastroFail(error.response.data.error.message));
    }
}
