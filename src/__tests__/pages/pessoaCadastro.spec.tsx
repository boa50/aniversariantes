import React from 'react';
import * as Gatsby from 'gatsby';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

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

jest.mock('../../components/alerta', () => {
    return (alert: any) => {
        const testId = alert.severity + '-alert';
        return <div data-testid={testId}></div>;
    };
});

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

const inputaDataAleatoria = (
    textField: HTMLElement,
): { input: HTMLInputElement; value: Date } => {
    const value = new Date('2000-01-02T03:00:00Z');
    const input = textField.children[1].children[0] as HTMLInputElement;

    fireEvent.change(input, {
        target: { valueAsDate: value },
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

const renderiza = (state: any) => {
    const mockStore = configureStore();
    const store = mockStore(state);

    return render(
        <Provider store={store}>
            <PessoaCadastro />
        </Provider>,
    );
};

const defaultState = {
    auth: { idFamilia: '' },
    pessoaCadastro: { pessoa: '', error: '' },
};

describe('PessoaCadastro page', () => {
    test('verifica a renderização inicial correta', () => {
        const { getByTestId } = renderiza(defaultState);

        const nomeInput = getByTestId('nome-input');
        const nascimentoInput = getByTestId('nascimento-input');
        const cadastrarButton = getByTestId('cadastrar-button');

        let errorAlerterror = '';
        try {
            getByTestId('error-alert');
        } catch (error) {
            errorAlerterror = error;
        }

        let successAlerterror = '';
        try {
            getByTestId('success-alert');
        } catch (error) {
            successAlerterror = error;
        }

        expect(errorAlerterror).toBeTruthy();
        expect(successAlerterror).toBeTruthy();
        expect(nomeInput).toBeVisible();
        expect(nascimentoInput).toBeVisible();
        expect(cadastrarButton).toBeVisible();
    });

    test('verifica a alteração do input de nome', () => {
        const { getByTestId } = renderiza(defaultState);

        const nomeInput = getByTestId('nome-input');
        const { input, value } = inputaTextoAleatorio(nomeInput);

        expect(input.value).toBe(value);
    });

    test('verifica a alteração do input de nascimento', () => {
        const { getByTestId } = renderiza(defaultState);

        const nascimentoInput = getByTestId('nascimento-input');
        const { input, value } = inputaDataAleatoria(nascimentoInput);

        expect(input.valueAsDate).toBe(value);
    });

    test('verifica o inicio do cadastro', () => {
        const initCadastro = initCadastroMock();
        mocks.push(initCadastro);

        const { getByTestId } = renderiza(defaultState);

        const nomeInput = getByTestId('nome-input');
        const nascimentoInput = getByTestId('nascimento-input');
        const cadastrarButton = getByTestId('cadastrar-button');

        inputaTextoAleatorio(nomeInput);
        inputaDataAleatoria(nascimentoInput);
        cadastrarButton.click();

        expect(initCadastro).toBeCalledTimes(1);
    });

    test('verifica o alerta de sucesso', () => {
        const initCadastro = initCadastroMock();
        mocks.push(initCadastro);

        const state = {
            ...defaultState,
            pessoaCadastro: {
                ...defaultState.pessoaCadastro,
                pessoa: 'pessoaMock',
            },
        };
        const { getByTestId } = renderiza(state);

        const nomeInput = getByTestId('nome-input');
        const nascimentoInput = getByTestId('nascimento-input');
        const cadastrarButton = getByTestId('cadastrar-button');

        inputaTextoAleatorio(nomeInput);
        inputaDataAleatoria(nascimentoInput);
        cadastrarButton.click();

        const alerta = getByTestId('success-alert');

        expect(initCadastro).toBeCalledTimes(1);
        expect(alerta).toBeVisible();
    });

    test('verifica o alerta de erro', () => {
        const initCadastro = initCadastroMock();
        mocks.push(initCadastro);

        const state = {
            ...defaultState,
            pessoaCadastro: {
                ...defaultState.pessoaCadastro,
                error: 'errorMock',
            },
        };
        const { getByTestId } = renderiza(state);

        const nomeInput = getByTestId('nome-input');
        const nascimentoInput = getByTestId('nascimento-input');
        const cadastrarButton = getByTestId('cadastrar-button');

        inputaTextoAleatorio(nomeInput);
        inputaDataAleatoria(nascimentoInput);
        cadastrarButton.click();

        const alerta = getByTestId('error-alert');

        expect(initCadastro).toBeCalledTimes(1);
        expect(alerta).toBeVisible();
    });
});
