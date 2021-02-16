import React from 'react';
import * as Gatsby from 'gatsby';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import * as ReachRouter from '@reach/router';
import {
    createMemorySource,
    createHistory,
    LocationProvider,
} from '@reach/router';

import {
    isDisplayed,
    getInputValue,
    setInputValue,
    isInputEnabled,
} from '../testUtils';

import * as actions from '../../store/actions';

import PessoaInformacoes from '../../pages/pessoaInformacoes';

const mocks: jest.SpyInstance[] = [];
let navigate: jest.SpyInstance<Promise<void>, [number]>;
let mockStore: any;
const location = window.location;
const idFamiliaMock = 'Esse id é bom';
const idPessoaMock = 'Algum Id bem legal para mockar';
const nomeMock = 'Jumento Teste Mockado';
const nomeMockAlterado = 'Alterado Jumento Teste Mockado Alterado';
const nascimentoMock = new Date('2000-11-24T03:00:00Z');
const nascimentoMockAlterado = new Date('2020-10-29T00:00:00Z');
const nascimentoMockFormatado =
    nascimentoMock.getDate() +
    '/' +
    (nascimentoMock.getMonth() + 1) +
    '/' +
    nascimentoMock.getFullYear();
const nascimentoMockFormatadoAlterado =
    nascimentoMockAlterado.getDate() +
    '/' +
    (nascimentoMockAlterado.getMonth() + 1) +
    '/' +
    nascimentoMockAlterado.getFullYear();

beforeEach(() => {
    navigate = navigateMock();
    mocks.push(navigate);

    mockStore = configureStore();

    // @ts-expect-error
    delete window.location;
});

afterEach(() => {
    mocks.forEach((mock: jest.SpyInstance) => {
        mock.mockClear();
    });
    mocks.length = 0;

    window.location = location;
});

const navigateMock = () => {
    return jest
        .spyOn(Gatsby, 'navigate')
        .mockImplementation((to: number) => Promise.resolve());
};

const useLocationMock = (state: any) => {
    return jest.spyOn(ReachRouter, 'useLocation').mockImplementation(() => ({
        ...location,
        state: state,
    }));
};

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
    texto = nomeMockAlterado,
): Promise<{ input: HTMLInputElement; value: string }> => {
    const value = texto;
    const input = await setInputValue(textField, value);

    return { input, value };
};

const inputaDataAleatoria = async (
    textField: HTMLElement,
    texto = nascimentoMockFormatadoAlterado,
): Promise<{ input: HTMLInputElement; value: string }> => {
    const value = texto;
    const input = await setInputValue(textField, value);

    return { input, value };
};

const initAtualizaMock = () => {
    return jest
        .spyOn(actions, 'initAtualiza')
        .mockImplementation(
            (
                idFamilia: string,
                idPessoa: string,
                pessoa: string,
                nascimento: Date,
            ) => ({
                type: 'check',
                idFamilia: idFamilia,
                idPessoa: idPessoa,
                pessoa: pessoa,
                nascimento: nascimento,
            }),
        );
};

const insereLocationMock = () => {
    const locationState = {
        idPessoa: idPessoaMock,
        nome: nomeMock,
        nascimento: nascimentoMock,
    };
    const useLocation = useLocationMock(locationState);
    mocks.push(useLocation);
};

const processaSalvar = async (state: any, initAtualiza: jest.SpyInstance) => {
    insereLocationMock();
    const { getByTestId } = await renderiza(state);
    const nomeInput = getByTestId('nome-input');
    const nascimentoInput = getByTestId('nascimento-input');

    const editarButton = getByTestId('editar-button');
    await waitFor(() => {
        fireEvent.click(editarButton);
    });

    await inputaTextoAleatorio(nomeInput);
    await inputaDataAleatoria(nascimentoInput);

    const salvarButton = getByTestId('salvar-button');
    await waitFor(() => {
        fireEvent.click(salvarButton);
    });

    expect(initAtualiza).toHaveBeenCalledTimes(1);
    expect(initAtualiza).toHaveBeenCalledWith(
        idFamiliaMock,
        idPessoaMock,
        nomeMockAlterado,
        nascimentoMockAlterado,
    );
    const nome = getInputValue(nomeInput);
    const nascimento = getInputValue(nascimentoInput);

    expect(nome).toBe(nomeMockAlterado);
    expect(nascimento).toBe(nascimentoMockFormatadoAlterado);

    return { getByTestId, nomeInput, nascimentoInput };
};

const processaCancelar = async (
    getByTestId: any,
    nomeInput: HTMLElement,
    nascimentoInput: HTMLElement,
) => {
    const editarButton = getByTestId('editar-button');
    await waitFor(() => {
        fireEvent.click(editarButton);
    });

    await inputaTextoAleatorio(nomeInput, 'nome muito doido');
    await inputaDataAleatoria(nascimentoInput, '20/08/1950');

    const cancelarButton = getByTestId('cancelar-button');
    await waitFor(() => {
        fireEvent.click(cancelarButton);
    });

    expect(isDisplayed(getByTestId, 'btns-salvar')).toBeFalsy();
    expect(isDisplayed(getByTestId, 'btns-editar')).toBeTruthy();

    expect(isInputEnabled(nomeInput)).toBeFalsy();
    expect(isInputEnabled(nascimentoInput)).toBeFalsy();

    const nome = getInputValue(nomeInput);
    const nascimento = getInputValue(nascimentoInput);

    return { nome, nascimento };
};

const defaultState = {
    properties: { isMobile: false },
    pessoaAtualiza: { loading: false, pessoa: '', error: '' },
    auth: { idFamilia: idFamiliaMock },
};

const renderiza = async (state = defaultState) => {
    const source = createMemorySource('/starting/url');
    const history = createHistory(source);
    const store = mockStore(state);

    return await render(
        <Provider store={store}>
            <LocationProvider history={history}>
                <PessoaInformacoes />,
            </LocationProvider>
            ,
        </Provider>,
    );
};

describe('PessoaInformacoes page', () => {
    test('verifica o redirecionamento sem dados', async () => {
        const useLocation = useLocationMock(null);
        mocks.push(useLocation);

        await renderiza();

        expect(navigate).toBeCalledTimes(1);
        expect(navigate).toBeCalledWith('/');
    });
    test('verifica a renderização inicial', async () => {
        insereLocationMock();
        const { getByTestId } = await renderiza();

        expect(navigate).not.toBeCalled();

        expect(isDisplayed(getByTestId, 'nome-input')).toBeTruthy();
        expect(isDisplayed(getByTestId, 'nascimento-input')).toBeTruthy();

        expect(isDisplayed(getByTestId, 'error-alert')).toBeFalsy();
        expect(isDisplayed(getByTestId, 'success-alert')).toBeFalsy();

        expect(isDisplayed(getByTestId, 'btns-editar')).toBeTruthy();
        expect(isDisplayed(getByTestId, 'btns-salvar')).toBeFalsy();

        const nomeInput = getByTestId('nome-input');
        const nascimentoInput = getByTestId('nascimento-input');

        const nome = getInputValue(nomeInput);
        const nascimento = getInputValue(nascimentoInput);

        expect(nome).toBe(nomeMock);
        expect(nascimento).toBe(nascimentoMockFormatado);
        expect(isInputEnabled(nomeInput)).toBeFalsy();
        expect(isInputEnabled(nascimentoInput)).toBeFalsy();
    });
    test('verifica o funcionamento do botao voltar', async () => {
        insereLocationMock();
        const { getByTestId } = await renderiza();

        const voltarButton = getByTestId('voltar-button');

        await waitFor(() => {
            fireEvent.click(voltarButton);
        });

        expect(navigate).toBeCalledTimes(1);
        expect(navigate).toBeCalledWith(-1);
    });
    test('verifica o funcionamento do botao editar', async () => {
        insereLocationMock();
        const { getByTestId } = await renderiza();

        const editarButton = getByTestId('editar-button');

        await waitFor(() => {
            fireEvent.click(editarButton);
        });

        const nomeInput = getByTestId('nome-input');
        const nascimentoInput = getByTestId('nascimento-input');

        expect(isDisplayed(getByTestId, 'btns-salvar')).toBeTruthy();
        expect(isDisplayed(getByTestId, 'btns-editar')).toBeFalsy();

        expect(isInputEnabled(nomeInput)).toBeTruthy();
        expect(isInputEnabled(nascimentoInput)).toBeTruthy();
    });
    test('verifica o funcionamento do botao cancelar', async () => {
        insereLocationMock();
        const { getByTestId } = await renderiza();

        const nomeInput = getByTestId('nome-input');
        const nascimentoInput = getByTestId('nascimento-input');

        const { nome, nascimento } = await processaCancelar(
            getByTestId,
            nomeInput,
            nascimentoInput,
        );

        expect(nome).toBe(nomeMock);
        expect(nascimento).toBe(nascimentoMockFormatado);
    });
    test('verifica o funcionamento do botao salvar com sucesso', async () => {
        const initAtualiza = initAtualizaMock();
        mocks.push(initAtualiza);

        const state = {
            ...defaultState,
            pessoaAtualiza: {
                ...defaultState.pessoaAtualiza,
                pessoa: 'pessoaMock',
            },
        };

        const {
            getByTestId,
            nomeInput,
            nascimentoInput,
        } = await processaSalvar(state, initAtualiza);

        expect(isDisplayed(getByTestId, 'btns-salvar')).toBeFalsy();
        expect(isDisplayed(getByTestId, 'btns-editar')).toBeTruthy();

        expect(isInputEnabled(nomeInput)).toBeFalsy();
        expect(isInputEnabled(nascimentoInput)).toBeFalsy();

        const alerta = getByTestId('success-alert');
        expect(alerta).toBeVisible();
    });
    test('verifica o funcionamento do botao salvar com erro', async () => {
        const initAtualiza = initAtualizaMock();
        mocks.push(initAtualiza);

        const state = {
            ...defaultState,
            pessoaAtualiza: {
                ...defaultState.pessoaAtualiza,
                error: 'algum erro esquisito',
            },
        };

        const {
            getByTestId,
            nomeInput,
            nascimentoInput,
        } = await processaSalvar(state, initAtualiza);

        expect(isDisplayed(getByTestId, 'btns-salvar')).toBeTruthy();
        expect(isDisplayed(getByTestId, 'btns-editar')).toBeFalsy();

        expect(isInputEnabled(nomeInput)).toBeTruthy();
        expect(isInputEnabled(nascimentoInput)).toBeTruthy();

        const alerta = getByTestId('error-alert');
        expect(alerta).toBeVisible();
    });
    test('verifica o funcionamento do botao cancelar após atualização', async () => {
        const initAtualiza = initAtualizaMock();
        mocks.push(initAtualiza);

        const state = {
            ...defaultState,
            pessoaAtualiza: {
                ...defaultState.pessoaAtualiza,
                pessoa: 'pessoaMock',
            },
        };

        const {
            getByTestId,
            nomeInput,
            nascimentoInput,
        } = await processaSalvar(state, initAtualiza);

        const { nome, nascimento } = await processaCancelar(
            getByTestId,
            nomeInput,
            nascimentoInput,
        );

        expect(nome).toBe(nomeMockAlterado);
        expect(nascimento).toBe(nascimentoMockFormatadoAlterado);
    });
});
