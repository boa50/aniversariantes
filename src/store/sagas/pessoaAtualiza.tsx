import axios from '../../axios';
import { put } from 'redux-saga/effects';
import { PessoaAtualizaAction } from '../../models/PessoaAtualizaAction';
import * as actions from '../actions';

export function* initAtualizaSaga(action: PessoaAtualizaAction) {
    yield put(actions.atualizaStart());
    const token = yield localStorage.getItem('token');
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        const idFamilia = action.idFamilia;
        const idPessoa = action.idPessoa;
        const url = idFamilia + '/aniversariantes/' + idPessoa;
        const payload = {
            fields: {
                pessoa: {
                    stringValue: action.pessoa,
                },
                nascimento: {
                    timestampValue: action.nascimento,
                },
            },
        };

        const response = yield axios.patch(url, payload, config);
        const pessoaAtualizada = response.data.fields.pessoa.stringValue;

        yield put(actions.atualizaSuccess(pessoaAtualizada));
    } catch (error) {
        yield put(actions.atualizaFail(error.response.data.error.message));
    }
}
