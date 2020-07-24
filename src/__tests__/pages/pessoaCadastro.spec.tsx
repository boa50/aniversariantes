import React from 'react';
import * as Gatsby from 'gatsby';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import { isDisplayed } from '../testUtils';

import * as actions from '../../store/actions';

import PessoaCadastro from '../../pages/pessoaCadastro';

beforeEach(() => {
    const useStaticQuery = jest.spyOn(Gatsby, 'useStaticQuery');
    useStaticQuery.mockImplementation(() => ({
        site: {
            siteMetadata: {
                title: 'Cadastro de Aniversariantes',
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
        const testId = alert.severity + '-alert';

        let retorno = null;
        if (alert.open) {
            retorno = <div data-testid={testId}></div>;
        }
        return retorno;
    };
});

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

const inputaDataAleatoria = async (
    textField: HTMLElement,
): Promise<{ input: HTMLInputElement; value: Date }> => {
    const value = new Date('2000-01-02T03:00:00Z');
    const input = textField.children[0].children[0] as HTMLInputElement;

    await waitFor(() => {
        fireEvent.change(input, {
            target: { valueAsDate: value },
        });
    });

    return { input, value };
};

const initCadastroMock = () => {
    return jest
        .spyOn(actions, 'initCadastro')
        .mockImplementation(
            (idFamilia: string, pessoa: string, nascimento: Date) => ({
                type: 'check',
                idFamilia: 'idFamiliamock',
                pessoa: 'pessoaMock',
                nascimento: new Date('2000-01-02T03:00:00Z'),
            }),
        );
};

const renderiza = async (state: any) => {
    const mockStore = configureStore();
    const store = mockStore(state);

    return await render(
        <Provider store={store}>
            <PessoaCadastro />
        </Provider>,
    );
};

const defaultState = {
    auth: { idFamilia: '' },
    pessoaCadastro: { pessoa: '', error: '' },
    properties: { isMobile: false },
};

describe('PessoaCadastro page', () => {
    test('verifica a renderização inicial correta', async () => {
        const { getByTestId } = await renderiza(defaultState);

        const nomeInput = getByTestId('nome-input');
        const nascimentoInput = getByTestId('nascimento-input');
        const cadastrarButton = getByTestId('cadastrar-button');

        expect(isDisplayed(getByTestId, 'error-alert')).toBeFalsy();
        expect(isDisplayed(getByTestId, 'success-alert')).toBeFalsy();
        expect(nomeInput).toBeVisible();
        expect(nascimentoInput).toBeVisible();
        expect(cadastrarButton).toBeVisible();
    });

    test('verifica a alteração do input de nome', async () => {
        const { getByTestId } = await renderiza(defaultState);

        const nomeInput = getByTestId('nome-input');
        const { input, value } = await inputaTextoAleatorio(nomeInput);

        expect(input.value).toBe(value);
    });

    test('verifica a alteração do input de nascimento', async () => {
        const { getByTestId } = await renderiza(defaultState);

        const nascimentoInput = getByTestId('nascimento-input');
        const { input, value } = await inputaDataAleatoria(nascimentoInput);

        expect(input.valueAsDate).toBe(value);
    });

    test('verifica o inicio do cadastro', async () => {
        const initCadastro = initCadastroMock();
        mocks.push(initCadastro);

        const { getByTestId } = await renderiza(defaultState);

        const nomeInput = getByTestId('nome-input');
        const nascimentoInput = getByTestId('nascimento-input');
        const cadastrarButton = getByTestId('cadastrar-button');

        await inputaTextoAleatorio(nomeInput);
        await inputaDataAleatoria(nascimentoInput);
        await waitFor(() => {
            fireEvent.click(cadastrarButton);
        });

        expect(initCadastro).toBeCalledTimes(1);
    });

    test('verifica o alerta de sucesso', async () => {
        const initCadastro = initCadastroMock();
        mocks.push(initCadastro);

        const state = {
            ...defaultState,
            pessoaCadastro: {
                ...defaultState.pessoaCadastro,
                pessoa: 'pessoaMock',
            },
        };
        const { getByTestId } = await renderiza(state);

        const nomeInput = getByTestId('nome-input');
        const nascimentoInput = getByTestId('nascimento-input');
        const cadastrarButton = getByTestId('cadastrar-button');

        await inputaTextoAleatorio(nomeInput);
        await inputaDataAleatoria(nascimentoInput);
        await waitFor(() => {
            fireEvent.click(cadastrarButton);
        });

        const alerta = getByTestId('success-alert');

        expect(initCadastro).toBeCalledTimes(1);
        expect(alerta).toBeVisible();
    });

    test('verifica o alerta de erro', async () => {
        const initCadastro = initCadastroMock();
        mocks.push(initCadastro);

        const state = {
            ...defaultState,
            pessoaCadastro: {
                ...defaultState.pessoaCadastro,
                error: 'errorMock',
            },
        };
        const { getByTestId } = await renderiza(state);

        const nomeInput = getByTestId('nome-input');
        const nascimentoInput = getByTestId('nascimento-input');
        const cadastrarButton = getByTestId('cadastrar-button');

        await inputaTextoAleatorio(nomeInput);
        await inputaDataAleatoria(nascimentoInput);
        await waitFor(() => {
            fireEvent.click(cadastrarButton);
        });

        const alerta = getByTestId('error-alert');

        expect(initCadastro).toBeCalledTimes(1);
        expect(alerta).toBeVisible();
    });
});
