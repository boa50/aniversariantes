import axios from '../../axios';
import axiosRaw from 'axios';
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

function* getFamiliaNome(idFamilia: string, token: string) {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const response = yield axios.get(idFamilia, config);
        const familiaNome = response.data.fields.nome.stringValue;

        return familiaNome;
    } catch (error) {
        const mensagem = trataErroMensagem(error);
        yield put(actions.authFail(mensagem));
        throw error;
    }
}

export function* initAuthSaga(action: AuthAction) {
    yield put(actions.authStart());
    const email = action.idFamilia + process.env.GATSBY_EMAIL_COMPLEMENT;
    const authData = {
        email: email,
        password: process.env.GATSBY_DB_PASSWORD,
        returnSecureToken: true,
    };
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.GATSBY_DB_API_KEY}`;

    try {
        const response = yield axiosRaw.post(url, authData);

        const expirationDate = yield new Date(
            new Date().getTime() + response.data.expiresIn * 1000,
        );
        const token = response.data.idToken;
        yield localStorage.setItem('token', token);
        yield localStorage.setItem('expirationDate', expirationDate);

        const familiaNome = yield getFamiliaNome(action.idFamilia, token);

        yield localStorage.setItem('idFamilia', action.idFamilia);
        yield put(actions.authSuccess(action.idFamilia, familiaNome));
    } catch (error) {
        yield put(actions.authFail(error.response.statusText));
    }
}

export function* authCheckStateSaga() {
    yield put(actions.authStart());
    const token = yield localStorage.getItem('token');
    const idFamilia = yield localStorage.getItem('idFamilia');

    if (!idFamilia) {
        yield put(actions.initLogout());
    } else if (!token) {
        yield put(actions.initAuth(idFamilia));
    } else {
        let expirationDate = yield localStorage.getItem('expirationDate');
        expirationDate = yield new Date(expirationDate);

        if (expirationDate <= new Date()) {
            yield put(actions.initAuth(idFamilia));
        } else {
            try {
                const familiaNome = yield getFamiliaNome(idFamilia, token);

                yield put(actions.authSuccess(idFamilia, familiaNome));
            } catch (error) {}
        }
    }
}

export function* initLogoutSaga() {
    localStorage.removeItem('idFamilia');
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');

    yield put(actions.logoutComplete());
}
