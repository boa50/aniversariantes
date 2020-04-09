import { takeEvery } from 'redux-saga/effects';
import * as actionTypes from '../actions/actionsTypes';
import { initAniversariantesSaga } from './aniversariantes';

export function* watch() {
    yield takeEvery(actionTypes.INIT_ANIVERSARIANTES, initAniversariantesSaga);
}
