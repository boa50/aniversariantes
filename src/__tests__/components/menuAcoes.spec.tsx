import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { WebShareInterface } from 'react-web-share-api';

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

        let erro = '';
        try {
            getByTestId('dot-menu');
        } catch (error) {
            erro = error;
        }

        const logoutBotao = getByTestId('Sair-menu-button');
        expect(logoutBotao).toBeVisible();
        expect(erro).toBeTruthy();
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

        let erro = '';
        try {
            getByTestId('dot-menu');
        } catch (error) {
            erro = error;
        }
        expect(erro).toBeTruthy();

        erro = '';
        try {
            getByTestId('Sair-menu-button');
        } catch (error) {
            erro = error;
        }
        expect(erro).toBeTruthy();
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

        let erro = '';
        try {
            getByTestId('Sair-menu-button');
        } catch (error) {
            erro = error;
        }
        expect(erro).toBeTruthy();

        const dotMenu = getByTestId('dot-menu');
        expect(dotMenu).toBeDefined();

        dotMenu.click();

        const dotMenuOpened = getByTestId('dot-menu-opened');
        const shareButton = getByTestId('share-button-menu');
        const logoutBotao = getByTestId('Sair-menu-button');
        expect(dotMenuOpened).toBeDefined();
        expect(shareButton).toBeDefined();
        expect(logoutBotao).toBeDefined();
    });
});
