import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { createStore } from 'redux';

import * as actionTypes from '../../store/actions/actionsTypes';

import TrocaMes from '../../components/trocaMes';

const defaultState = {
    aniversariantes: { mes: 10 },
    properties: {
        isMobile: false,
    },
};

const mockReducer = (state = defaultState, action: any) => {
    switch (action.type) {
        case actionTypes.SET_MES_INFO:
            return {
                ...state,
                aniversariantes: { mes: action.mes },
            };
        default:
            return state;
    }
};

describe('TrocaMes component', () => {
    const mockStore = configureStore();
    let store;

    test('verifica se a renderização foi feita de maneira correta', () => {
        store = mockStore(defaultState);

        const { getByTestId } = render(
            <Provider store={store}>
                <TrocaMes />
            </Provider>,
        );
        const pagination = getByTestId('pagination-material-component');

        expect(pagination).toBeDefined();
    });

    test('verifica a troca dos meses', async () => {
        store = createStore(mockReducer);

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
        expect(store.getState().aniversariantes.mes).toBe(12);

        trocaMesPrevious.click();
        expect(store.getState().aniversariantes.mes).toBe(11);
    });

    test('verifica a quantidade de meses apresentados no pagination no mobile', () => {
        const state = {
            ...defaultState,
            properties: { isMobile: true },
        };
        store = mockStore(state);

        const { container, getByTestId } = render(
            <Provider store={store}>
                <TrocaMes />
            </Provider>,
        );

        const pagination = getByTestId('pagination-material-component');

        expect(pagination).toBeDefined();

        const trocaMeses: any = container.getElementsByClassName(
            'MuiPaginationItem-page',
        );

        expect(trocaMeses.length).toBe(6);
    });
});
