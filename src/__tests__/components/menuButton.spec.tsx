import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import { isDisplayed } from '../testUtils';

import MenuButton from '../../components/menuButton';

describe('MenuButton component', () => {
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
                <MenuButton
                    link="/mock"
                    textMobile="textmock"
                    Icon={ExitToAppIcon}
                />
            </Provider>,
        );

        const botao = getByTestId('textmock-menu-button');
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
                <MenuButton
                    link="/mock"
                    textMobile="textmock"
                    Icon={ExitToAppIcon}
                />
            </Provider>,
        );

        const botao = getByTestId('textmock-menu-button');
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
                <MenuButton
                    link="/mock"
                    textMobile="textmock"
                    Icon={ExitToAppIcon}
                />
            </Provider>,
        );

        expect(isDisplayed(getByTestId, 'textmock-menu-button')).toBeFalsy();
    });
});
