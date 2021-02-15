import axios from '../../axios';
import { put } from 'redux-saga/effects';
import { PessoaAtualizaAction } from '../../models/PessoaAtualizaAction';
import * as actions from '../actions';

export function* initAtualizaSaga(action: PessoaAtualizaAction) {
    yield put(actions.atualizaStart());

    //TODO Aqui vai a lógica da atualização

    yield put(actions.atualizaSuccess(action.pessoa));
    // yield put(actions.atualizaFail('testeErro'));
}
