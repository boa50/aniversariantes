import React from 'react';
import * as Gatsby from 'gatsby';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

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

describe('Index page', () => {
    const mockMesNumero = 10;
    const mockMesTexto = 'Outubro';
    const mockStore = configureStore();

    test('verifica se a renderização foi feita de maneira correta', () => {
        const state = {
            aniversariantes: {
                mes: mockMesNumero,
                loading: false,
            },
            auth: { loading: false, idFamilia: 'mock' },
        };
        const store = mockStore(state);

        const { getByTestId } = render(
            <Provider store={store}>
                <App />
            </Provider>,
        );

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
            aniversariantes: { loading: true, mes: 10 },
            auth: { loading: false, idFamilia: 'mock' },
        };
        const store = mockStore(state);

        const { getByTestId } = render(
            <Provider store={store}>
                <App />
            </Provider>,
        );

        const loadingIcon = getByTestId('loading-aniversariantes');

        expect(loadingIcon).toBeDefined();
    });
});
