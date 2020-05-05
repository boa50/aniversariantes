import React from 'react';
import * as Gatsby from 'gatsby';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import * as actions from '../../store/actions';

import Login from '../../pages/login';

beforeEach(() => {
    const useStaticQuery = jest.spyOn(Gatsby, 'useStaticQuery');
    useStaticQuery.mockImplementation(() => ({
        site: {
            siteMetadata: {
                title: 'Aniversariantes',
            },
        },
    }));
});

const mocks: jest.SpyInstance[] = [];
afterEach(() => {
    mocks.forEach((mock: jest.SpyInstance) => {
        mock.mockClear();
    });
    mocks.length = 0;
});

jest.mock('../../components/header', () => {
    return () => <div data-testid="HeaderMock"></div>;
});

jest.mock('../../components/alerta', () => {
    return () => <div data-testid="AlertaMock"></div>;
});

const navigateMock = () => {
    return jest
        .spyOn(Gatsby, 'navigate')
        .mockImplementation((to: number) => Promise.resolve());
};

const initAuthMock = () => {
    return jest
        .spyOn(actions, 'initAuth')
        .mockImplementation((idFamilia: string) => ({
            type: 'check',
            idFamilia: 'mock',
        }));
};

const renderiza = (state: any) => {
    const mockStore = configureStore();
    const store = mockStore(state);

    return render(
        <Provider store={store}>
            <Login />
        </Provider>,
    );
};

const inputaTextoAleatorio = (
    textField: HTMLElement,
): { input: HTMLInputElement; value: string } => {
    const value = 'jumento';
    const input = textField.children[1].children[0] as HTMLInputElement;

    fireEvent.change(input, {
        target: { value: value },
    });

    return { input, value };
};

const defaultState = {
    auth: { error: '', idFamilia: '' },
};

describe('Login page', () => {
    test('verifica a renderização correta', () => {
        const { getByTestId } = renderiza(defaultState);

        const codigoFamiliaInput = getByTestId('codigo-familia-input');
        const loginButton = getByTestId('button-login');

        let erro = '';
        try {
            getByTestId('AlertaMock');
        } catch (error) {
            erro = error;
        }

        expect(erro).toBeTruthy();
        expect(codigoFamiliaInput).toBeVisible();
        expect(loginButton).toBeVisible();
    });

    test('verifica o redirect', () => {
        const state = {
            auth: {
                ...defaultState.auth,
                idFamilia: 'mock',
            },
        };
        const navigate = navigateMock();

        renderiza(state);

        expect(navigate).toBeCalledTimes(1);
    });

    test('verifica a checagem da família', () => {
        const checkIdFamilia = jest
            .spyOn(actions, 'checkIdFamilia')
            .mockImplementation(() => ({ type: 'check' }));
        mocks.push(checkIdFamilia);

        renderiza(defaultState);

        expect(checkIdFamilia).toBeCalledTimes(1);
    });

    test('verifica a alteração do código da família', () => {
        const { getByTestId } = renderiza(defaultState);

        const codigoFamiliaInput = getByTestId('codigo-familia-input');
        const { input, value } = inputaTextoAleatorio(codigoFamiliaInput);

        expect(input.value).toBe(value);
    });

    test('verifica o início do login', () => {
        const initAuth = initAuthMock();
        mocks.push(initAuth);

        const { getByTestId } = renderiza(defaultState);

        const loginButton = getByTestId('button-login');
        const codigoFamiliaInput = getByTestId('codigo-familia-input');

        inputaTextoAleatorio(codigoFamiliaInput);
        loginButton.click();

        expect(initAuth).toBeCalledTimes(1);
    });

    test('verifica o alerta de erro', () => {
        const initAuth = initAuthMock();
        mocks.push(initAuth);

        const state = {
            auth: {
                ...defaultState.auth,
                error: 'mockError',
            },
        };
        const { getByTestId } = renderiza(state);

        const loginButton = getByTestId('button-login');
        const codigoFamiliaInput = getByTestId('codigo-familia-input');

        inputaTextoAleatorio(codigoFamiliaInput);
        loginButton.click();

        const alerta = getByTestId('AlertaMock');

        expect(initAuth).toBeCalledTimes(1);
        expect(alerta).toBeVisible();
    });
});
