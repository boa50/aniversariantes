import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import { isDisplayed } from '../testUtils';

import ShareAniversariantesButton from '../../components/shareAniversariantesButton';

jest.mock('react', () => {
    const React = jest.requireActual('react');
    React.lazy = () => () => <div data-testid="share-button"></div>;
    return React;
});

describe('ShareAniversariantesButton component', () => {
    const mockStore = configureStore();
    let store, state;

    test('verifica a renderiação correta', () => {
        state = {
            auth: { idFamilia: 'mock' },
            aniversariantes: { loading: false, aniversariantes: [], mes: 10 },
            properties: { isMobile: true },
        };

        store = mockStore(state);

        const { getByTestId } = render(
            <Provider store={store}>
                <ShareAniversariantesButton />
            </Provider>,
        );

        const botao = getByTestId('share-button');
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
                <ShareAniversariantesButton />
            </Provider>,
        );

        expect(isDisplayed(getByTestId, 'share-button')).toBeFalsy();
    });
});
