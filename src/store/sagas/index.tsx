import { takeEvery } from 'redux-saga/effects';
import * as actionTypes from '../actions/actionsTypes';
import { getAniversariantesSaga } from './aniversariantes';

export function* watch() {
    yield takeEvery(actionTypes.GET_ANIVERSARIANTES, getAniversariantesSaga);
}
