import axios from '../../axios';
import { put } from 'redux-saga/effects';
import { PessoaAtualizaAction } from '../../models/PessoaAtualizaAction';
import * as actions from '../actions';
import DbUtils from '../../utils/dbUtils';

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
        const idPessoa = action.aniversariante.idPessoa;
        const url = idFamilia + '/aniversariantes/' + idPessoa;
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

        const response = yield axios.patch(url, payload, config);
        const pessoaAtualizada = response.data.fields.pessoa.stringValue;

        yield put(actions.atualizaSuccess({ pessoa: pessoaAtualizada }));
    } catch (error) {
        yield put(actions.atualizaFail(error.response.data.error.message));
    }
}
