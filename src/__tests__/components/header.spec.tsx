import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import Header from '../../components/header';

describe('Header component', () => {
    const mockStore = configureStore();
    let store, state;

    test('verifica se a renderização foi feita de maneira correta', () => {
        const mockFamiliaNome = 'mock';
        state = {
            auth: { familiaNome: mockFamiliaNome, idFamilia: 'mock' },
            aniversariantes: { loading: false },
        };
        store = mockStore(state);

        const { getByTestId } = render(
            <Provider store={store}>
                <Header />
            </Provider>,
        );

        const texto = getByTestId('header-texto');
        const logo = getByTestId('header-logo');

        expect(logo).toBeDefined();
        expect(texto.textContent).toBe(
            `Aniversariantes - Família ${mockFamiliaNome}`,
        );
    });

    test('verifica a renderização sem login', () => {
        state = {
            auth: { familiaNome: '' },
            aniversariantes: { loading: true },
        };
        store = mockStore(state);

        const { getByTestId } = render(
            <Provider store={store}>
                <Header />
            </Provider>,
        );

        const texto = getByTestId('header-texto');
        expect(texto.textContent).toBe('Aniversariantes');
        expect(texto.className).toContain('MuiTypography-h6');
    });

    test('verifica a renderização no mobile', () => {
        window.matchMedia = jest.fn().mockImplementation(query => {
            return {
                matches: true,
                media: query,
                onchange: null,
                addListener: jest.fn(),
                removeListener: jest.fn(),
            };
        });

        state = {
            auth: { familiaNome: '' },
            aniversariantes: { loading: true },
        };
        store = mockStore(state);

        const { getByTestId } = render(
            <Provider store={store}>
                <Header />
            </Provider>,
        );

        const texto = getByTestId('header-texto');
        expect(texto.className).toContain('MuiTypography-subtitle1');
    });
});
