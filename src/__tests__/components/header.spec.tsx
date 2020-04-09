import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import Header from '../../components/header';

describe('Header component', () => {
    const mockStore = configureStore();
    let store, state;

    test('verifica se a renderização foi feita de maneira correta', () => {
        state = {};
        store = mockStore(state);

        const { getByTestId } = render(
            <Provider store={store}>
                <Header />
            </Provider>,
        );

        const texto = getByTestId('header-texto');
        const logo = getByTestId('header-logo');

        expect(logo).toBeDefined();
        expect(texto.textContent).toMatch(/Aniversariantes/);
    });
});
