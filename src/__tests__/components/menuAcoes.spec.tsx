import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { WebShareInterface } from 'react-web-share-api';

import { isDisplayed } from '../testUtils';

import MenuAcoes from '../../components/menuAcoes';

jest.mock('react-web-share-api', () => {
    const webShare = jest.requireActual('react-web-share-api');
    webShare.default = () => (Component: React.FC<WebShareInterface>) => () => (
        <Component isSupported={true} share={() => {}} />
    );
    return webShare;
});

describe('MenuAcoes component', () => {
    const mockStore = configureStore();
    let store, state;

    test('verifica a renderização correta', () => {
        state = {
            auth: { idFamilia: 'mock' },
            aniversariantes: { loading: false },
            properties: { isMobile: false },
        };

        store = mockStore(state);

        const { getByTestId } = render(
            <Provider store={store}>
                <MenuAcoes />
            </Provider>,
        );

        const logoutBotao = getByTestId('Sair-menu-button');
        expect(logoutBotao).toBeVisible();
        expect(isDisplayed(getByTestId, 'dot-menu')).toBeFalsy();
    });

    test('verifica a renderização sem login', () => {
        state = {
            auth: { idFamilia: '' },
            aniversariantes: { loading: true },
            properties: { isMobile: false },
        };

        store = mockStore(state);

        const { getByTestId } = render(
            <Provider store={store}>
                <MenuAcoes />
            </Provider>,
        );

        expect(isDisplayed(getByTestId, 'dot-menu')).toBeFalsy();
        expect(isDisplayed(getByTestId, 'Sair-menu-button')).toBeFalsy();
        expect(isDisplayed(getByTestId, 'Cadastrar-menu-button')).toBeFalsy();
    });

    test('verifica a renderização do mobile', () => {
        state = {
            auth: { idFamilia: 'mock' },
            aniversariantes: { loading: false },
            properties: { isMobile: true },
        };

        store = mockStore(state);

        const { getByTestId } = render(
            <Provider store={store}>
                <MenuAcoes />
            </Provider>,
        );

        expect(isDisplayed(getByTestId, 'Sair-menu-button')).toBeFalsy();

        const dotMenu = getByTestId('dot-menu');
        expect(dotMenu).toBeDefined();

        dotMenu.click();

        const dotMenuOpened = getByTestId('dot-menu-opened');
        const shareButton = getByTestId('share-button-menu');
        const logoutBotao = getByTestId('Sair-menu-button');
        const cadastroBotao = getByTestId('Cadastrar-menu-button');
        expect(dotMenuOpened).toBeDefined();
        expect(shareButton).toBeDefined();
        expect(logoutBotao).toBeDefined();
        expect(cadastroBotao).toBeDefined();
    });
});
