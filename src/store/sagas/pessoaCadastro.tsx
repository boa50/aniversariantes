import axios from '../../axios';
import { put } from 'redux-saga/effects';
import { PessoaCadastroAction } from '../../models/PessoaCadastroAction';
import * as actions from '../actions';

export function* initCadastroSaga(action: PessoaCadastroAction) {
    yield put(actions.cadastroStart());

    try {
        const idFamilia = action.idFamilia;
        const url = idFamilia + '/aniversariantes/';
        const nascimento = action.nascimento + 'T03:00:00Z';
        const payload = {
            fields: {
                pessoa: {
                    stringValue: action.pessoa,
                },
                nascimento: {
                    timestampValue: nascimento,
                },
            },
        };

        // const response = yield axios.post(url, payload);
        // const pessoaCadastrada = response.data.fields.pessoa.stringValue;
        const pessoaCadastrada = action.pessoa;

        yield put(actions.cadastroSuccess(pessoaCadastrada));
    } catch (error) {
        yield put(actions.cadastroFail(error));
    }
}
