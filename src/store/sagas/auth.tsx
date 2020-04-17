import { put } from 'redux-saga/effects';
import { AuthAction } from '../../models/AuthAction';
import * as actions from '../actions';

export function* initAuthSaga(action: AuthAction) {
    yield put(actions.authStart());

    const idsFamilia = ['ooQKFaqwblGMPNq0AUML', 'zRMPmD0qcvFufmu2Cmfz'];

    if (idsFamilia.indexOf(action.idFamilia) < 0) {
        yield put(actions.authFail('Código não existente!'));
    } else {
        yield put(actions.authSuccess(action.idFamilia));
        yield localStorage.setItem('idFamilia', action.idFamilia);
    }
}

export function* checkIdFamiliaSaga() {
    yield put(actions.authStart());

    const idFamilia = yield localStorage.getItem('idFamilia');

    if (idFamilia) {
        yield put(actions.authSuccess(idFamilia));
    } else {
        yield put(actions.authFail(''));
    }
}

export function* initLogoutSaga() {
    localStorage.removeItem('idFamilia');

    yield put(actions.logoutComplete());
}
