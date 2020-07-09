import { takeEvery } from 'redux-saga/effects';
import * as actionTypes from '../actions/actionsTypes';
import { initAniversariantesSaga } from './aniversariantes';
import { authCheckStateSaga, initAuthSaga, initLogoutSaga } from './auth';
import { initCadastroSaga } from './pessoaCadastro';

export function* watch() {
    yield takeEvery(actionTypes.INIT_ANIVERSARIANTES, initAniversariantesSaga);
    yield takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga);
    yield takeEvery(actionTypes.INIT_AUTH, initAuthSaga);
    yield takeEvery(actionTypes.INIT_LOGOUT, initLogoutSaga);
    yield takeEvery(actionTypes.INIT_PESSOA_CADASTRO, initCadastroSaga);
}
