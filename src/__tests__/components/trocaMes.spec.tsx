import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { createStore } from 'redux';
import { Context as ResponsiveContext } from 'react-responsive';

import reducer from '../../store/reducers/aniversariantes';

import TrocaMes from '../../components/trocaMes';

describe('TrocaMes component', () => {
    const state = { aniversariantes: { mes: 10 } };
    const mockStore = configureStore();
    let store;

    test('verifica se a renderização foi feita de maneira correta', () => {
        store = mockStore(state);

        const { getByTestId } = render(
            <Provider store={store}>
                <TrocaMes />
            </Provider>,
        );
        const pagination = getByTestId('pagination-material-component');

        expect(pagination).toBeDefined();
    });

    test('verifica a troca dos meses', async () => {
        store = createStore(reducer);

        const { container } = render(
            <Provider store={store}>
                <TrocaMes />
            </Provider>,
        );

        const trocaMeses: any = container.getElementsByClassName(
            'MuiPaginationItem-page',
        );
        const trocaMesDezembro = trocaMeses[trocaMeses.length - 2];
        const trocaMesPrevious = trocaMeses[0];

        trocaMesDezembro.click();
        expect(store.getState().mes).toBe(12);

        trocaMesPrevious.click();
        expect(store.getState().mes).toBe(11);
    });

    test('verifica a quantidade de meses apresentados no pagination em tela grande', () => {
        store = mockStore(state);

        const { container, getByTestId } = render(
            <Provider store={store}>
                <ResponsiveContext.Provider value={{ width: 550 }}>
                    <TrocaMes />
                </ResponsiveContext.Provider>
            </Provider>,
        );
        const pagination = getByTestId('pagination-material-component');

        expect(pagination).toBeDefined();

        const trocaMeses: any = container.getElementsByClassName(
            'MuiPaginationItem-page',
        );

        expect(trocaMeses.length).toBe(14);
    });
});
