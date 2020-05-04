import React from 'react';
import * as Gatsby from 'gatsby';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import * as actions from '../../store/actions';

import App from '../../pages/index';

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

jest.mock('../../components/aniversariantesDia', () => {
    return () => <div data-testid="AniversariantesDiaMock"></div>;
});

jest.mock('../../components/trocaMes', () => {
    return () => <div data-testid="TrocaMesMock"></div>;
});

jest.mock('../../components/listaAniversariantes', () => {
    return () => <div data-testid="ListaAniversariantesMock"></div>;
});

const navigateMock = () => {
    return jest
        .spyOn(Gatsby, 'navigate')
        .mockImplementation((to: number) => Promise.resolve());
};

const renderiza = (state: any) => {
    const mockStore = configureStore();
    const store = mockStore(state);

    return render(
        <Provider store={store}>
            <App />
        </Provider>,
    );
};

const mockMesNumero = 10;
const mockMesTexto = 'Outubro';

const defaultState = {
    aniversariantes: {
        mes: mockMesNumero,
        loading: true,
    },
    auth: { loading: true, idFamilia: '' },
};

describe('Index page', () => {
    test('verifica se a renderização foi feita de maneira correta', () => {
        const state = {
            aniversariantes: {
                ...defaultState.aniversariantes,
                loading: false,
            },
            auth: { loading: false, idFamilia: 'mock' },
        };
        const { getByTestId } = renderiza(state);

        const headerMock = getByTestId('HeaderMock');
        const aniversariantesDiaMock = getByTestId('AniversariantesDiaMock');
        const trocaMesMock = getByTestId('TrocaMesMock');
        const listaAniversariantesMock = getByTestId(
            'ListaAniversariantesMock',
        );
        const mesNome = getByTestId('mes-nome');

        expect(mesNome.textContent).toBe(mockMesTexto);

        expect(headerMock).toBeDefined();
        expect(aniversariantesDiaMock).toBeDefined();
        expect(trocaMesMock).toBeDefined();
        expect(listaAniversariantesMock).toBeDefined();
    });

    test('verifica se carrega o icone de loading', () => {
        const state = {
            ...defaultState,
            auth: { loading: false, idFamilia: 'mock' },
        };
        const { getByTestId } = renderiza(state);

        const loadingIcon = getByTestId('loading-aniversariantes');

        expect(loadingIcon).toBeDefined();
    });

    test('verifica checagem da família', () => {
        const state = {
            ...defaultState,
            auth: { ...defaultState.auth, loading: false },
        };

        const checkIdFamilia = jest
            .spyOn(actions, 'checkIdFamilia')
            .mockImplementation(() => ({ type: 'check' }));
        mocks.push(checkIdFamilia);
        mocks.push(navigateMock());

        renderiza(state);

        expect(checkIdFamilia).toBeCalledTimes(1);
    });

    test('verifica a não autenticação', () => {
        const state = {
            ...defaultState,
            auth: { ...defaultState.auth, loading: false },
        };

        const navigate = navigateMock();
        mocks.push(navigate);

        renderiza(state);

        expect(navigate).toBeCalledTimes(1);
    });
});
