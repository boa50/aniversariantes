import React from 'react';
import * as Gatsby from 'gatsby';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import * as ReachRouter from '@reach/router';
import {
    createMemorySource,
    createHistory,
    LocationProvider,
} from '@reach/router';

import { isDisplayed, getInputValue } from '../testUtils';

import PessoaInformacoes from '../../pages/pessoaInformacoes';

const mocks: jest.SpyInstance[] = [];
let navigate: jest.SpyInstance<Promise<void>, [number]>;
let mockStore: any;
const location = window.location;

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

const renderiza = async () => {
    const source = createMemorySource('/starting/url');
    const history = createHistory(source);

    const state = { properties: { isMobile: false } };
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
    test('verifica a renderização inicial', async () => {
        const useLocation = useLocationMock(null);
        mocks.push(useLocation);

        await renderiza();

        expect(navigate).toBeCalledTimes(1);
        expect(navigate).toBeCalledWith('/');
    });
    test('verifica o redirecionamento sem dados', async () => {
        const nomeMock = 'Jumento Teste Mockado';
        const nascimentoMock = new Date('2000-11-24T03:00:00Z');
        const nascimentoMockFormatado =
            nascimentoMock.getDate() +
            '/' +
            (nascimentoMock.getMonth() + 1) +
            '/' +
            nascimentoMock.getFullYear();

        const locationState = { nome: nomeMock, nascimento: nascimentoMock };
        const useLocation = useLocationMock(locationState);
        mocks.push(useLocation);

        const { getByTestId } = await renderiza();

        expect(navigate).not.toBeCalled();

        expect(isDisplayed(getByTestId, 'nome-input')).toBeTruthy();
        expect(isDisplayed(getByTestId, 'nascimento-input')).toBeTruthy();

        const nomeInput = getByTestId('nome-input');
        const nascimentoInput = getByTestId('nascimento-input');

        const nome = getInputValue(nomeInput);
        const nascimento = getInputValue(nascimentoInput);

        expect(nome).toBe(nomeMock);
        expect(nascimento).toBe(nascimentoMockFormatado);
    });
});
