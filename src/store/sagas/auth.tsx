import axios from '../../axios';
import { put } from 'redux-saga/effects';
import { AuthAction } from '../../models/AuthAction';
import * as actions from '../actions';

const trataErroMensagem = (error: any) => {
    if (error.response.data.error.code === 404) {
        return 'Código não existente!';
    } else {
        return error.response.statusText;
    }
};

export function* initAuthSaga(action: AuthAction) {
    yield put(actions.authStart());

    try {
        const response = yield axios.get(action.idFamilia);
        const familiaNome = response.data.fields.nome.stringValue;

        yield localStorage.setItem('idFamilia', action.idFamilia);
        yield put(actions.authSuccess(action.idFamilia, familiaNome));
    } catch (error) {
        let mensagem = trataErroMensagem(error);
        yield put(actions.authFail(mensagem));
    }
}

export function* checkIdFamiliaSaga() {
    yield put(actions.authStart());
    const idFamilia = yield localStorage.getItem('idFamilia');

    if (idFamilia) {
        try {
            const response = yield axios.get(idFamilia);
            const familiaNome = response.data.fields.nome.stringValue;

            yield put(actions.authSuccess(idFamilia, familiaNome));
        } catch (error) {
            let mensagem = trataErroMensagem(error);
            yield put(actions.authFail(mensagem));
        }
    } else {
        yield put(actions.authFail(''));
    }
}

export function* initLogoutSaga() {
    localStorage.removeItem('idFamilia');

    yield put(actions.logoutComplete());
}
