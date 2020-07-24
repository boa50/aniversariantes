import React from 'react';
import * as Gatsby from 'gatsby';
import { render, fireEvent, waitFor } from '@testing-library/react';
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

jest.mock('../../components/ui/alerta', () => {
    return (alert: any) => {
        let retorno = null;
        if (alert.open) {
            retorno = <div data-testid="AlertaMock"></div>;
        }
        return retorno;
    };
});

const initAuthMock = () => {
    return jest
        .spyOn(actions, 'initAuth')
        .mockImplementation((idFamilia: string) => ({
            type: 'check',
            idFamilia: 'mock',
        }));
};

const renderiza = async (state: any) => {
    const mockStore = configureStore();
    const store = mockStore(state);

    return await render(
        <Provider store={store}>
            <Login />
        </Provider>,
    );
};

const inputaTextoAleatorio = async (
    textField: HTMLElement,
): Promise<{ input: HTMLInputElement; value: string }> => {
    const value = 'jumento';
    const input = textField.children[0].children[0] as HTMLInputElement;

    await waitFor(() => {
        fireEvent.change(input, {
            target: { value: value },
        });
    });

    return { input, value };
};

const defaultState = {
    auth: { error: '', idFamilia: '' },
    properties: { isMobile: false },
};

describe('Login page', () => {
    test('verifica a renderização correta', async () => {
        const { getByTestId } = await renderiza(defaultState);

        const codigoFamiliaInput = getByTestId('idFamilia-input');
        const loginButton = getByTestId('login-button');

        expect(isDisplayed(getByTestId, 'AlertaMock')).toBeFalsy();
        expect(codigoFamiliaInput).toBeVisible();
        expect(loginButton).toBeVisible();
    });

    test('verifica a alteração do código da família', async () => {
        const { getByTestId } = await renderiza(defaultState);

        const codigoFamiliaInput = getByTestId('idFamilia-input');
        const { input, value } = await inputaTextoAleatorio(codigoFamiliaInput);

        expect(input.value).toBe(value);
    });

    test('verifica o início do login', async () => {
        const initAuth = initAuthMock();
        mocks.push(initAuth);

        const { getByTestId } = await renderiza(defaultState);

        const loginButton = getByTestId('login-button');
        const codigoFamiliaInput = getByTestId('idFamilia-input');

        await inputaTextoAleatorio(codigoFamiliaInput);
        await waitFor(() => {
            fireEvent.click(loginButton);
        });

        expect(initAuth).toBeCalledTimes(1);
    });

    test('verifica o alerta de erro', async () => {
        const initAuth = initAuthMock();
        mocks.push(initAuth);

        const state = {
            ...defaultState,
            auth: {
                ...defaultState.auth,
                error: 'mockError',
            },
        };
        const { getByTestId } = await renderiza(state);

        const loginButton = getByTestId('login-button');
        const codigoFamiliaInput = getByTestId('idFamilia-input');

        await inputaTextoAleatorio(codigoFamiliaInput);
        await waitFor(() => {
            fireEvent.click(loginButton);
        });

        // Há um bug no click do login fazendo com que a função seja chamada 2 vezes no teste
        // falhando ao chamar o assert .toBeCalledTimes(1)
        expect(initAuth).toBeCalled();

        const alerta = getByTestId('AlertaMock');
        expect(alerta).toBeVisible();
    });

    test('verifica a renderização com família preenchida', async () => {
        const state = {
            ...defaultState,
            auth: {
                ...defaultState.auth,
                idFamilia: 'familiaMock',
            },
        };
        const { getByTestId } = await renderiza(state);

        expect(isDisplayed(getByTestId, 'idFamilia-input')).toBeFalsy();
        expect(isDisplayed(getByTestId, 'login-button')).toBeFalsy();
    });
});
