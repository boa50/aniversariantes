import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import MenuButton from '../../components/menuButton';

describe('LogoutButton component', () => {
    const mockStore = configureStore();
    let store, state;

    test('verifica a renderiação correta', () => {
        state = {
            auth: { idFamilia: 'mock' },
            aniversariantes: { loading: false },
            properties: { isMobile: false },
        };

        store = mockStore(state);

        const { getByTestId } = render(
            <Provider store={store}>
                <LogoutButton />
            </Provider>,
        );

        const botao = getByTestId('logout-botao');
        expect(botao).toBeVisible();
    });

    test('verifica a renderização no mobile', () => {
        state = {
            auth: { idFamilia: 'mock' },
            aniversariantes: { loading: false },
            properties: { isMobile: true },
        };

        store = mockStore(state);

        const { getByTestId } = render(
            <Provider store={store}>
                <LogoutButton />
            </Provider>,
        );

        const botao = getByTestId('logout-botao');
        expect(botao).toBeVisible();
    });

    test('verifica a não renderiação', () => {
        state = {
            auth: { idFamilia: '' },
            aniversariantes: { loading: true },
            properties: { isMobile: false },
        };

        store = mockStore(state);

        const { getByTestId } = render(
            <Provider store={store}>
                <LogoutButton />
            </Provider>,
        );

        let erro = '';
        try {
            getByTestId('logout-botao');
        } catch (error) {
            erro = error;
        }

        expect(erro).toBeTruthy();
    });
});
