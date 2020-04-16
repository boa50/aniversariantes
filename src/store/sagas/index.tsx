import { takeEvery } from 'redux-saga/effects';
import * as actionTypes from '../actions/actionsTypes';
import { initAniversariantesSaga } from './aniversariantes';
import { checkIdFamiliaSaga, initAuthSaga } from './auth';

export function* watch() {
    yield takeEvery(actionTypes.INIT_ANIVERSARIANTES, initAniversariantesSaga);
    yield takeEvery(actionTypes.CHECK_ID_FAMILIA, checkIdFamiliaSaga);
    yield takeEvery(actionTypes.INIT_AUTH, initAuthSaga);
}
