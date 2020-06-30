import React from 'react';
import * as Gatsby from 'gatsby';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import { isDisplayed } from '../testUtils';

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

type LayoutProps = {
    children: React.ReactNode;
};
jest.mock('../../components/layout', () => {
    return ({ children }: LayoutProps) => (
        <div data-testid="Layout">{children}</div>
    );
});

jest.mock('../../components/alerta', () => {
    return () => <div data-testid="AlertaMock"></div>;
});

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
    properties: { isMobile: false },
};

describe('Login page', () => {
    test('verifica a renderização correta', () => {
        const { getByTestId } = renderiza(defaultState);

        const codigoFamiliaInput = getByTestId('codigo-familia-input');
        const loginButton = getByTestId('button-login');

        expect(isDisplayed(getByTestId, 'AlertaMock')).toBeFalsy();
        expect(codigoFamiliaInput).toBeVisible();
        expect(loginButton).toBeVisible();
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
            ...defaultState,
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

    test('verifica a renderização com família preenchida', () => {
        const state = {
            ...defaultState,
            auth: {
                ...defaultState.auth,
                idFamilia: 'familiaMock',
            },
        };
        const { getByTestId } = renderiza(state);

        expect(isDisplayed(getByTestId, 'codigo-familia-input')).toBeFalsy();
        expect(isDisplayed(getByTestId, 'button-login')).toBeFalsy();
    });
});
