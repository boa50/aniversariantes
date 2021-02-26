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

beforeEach(() => {
    setPathname();
});

const setPathname = (pathname: string = '/') => {
    const url = 'http://mock.com';
    const location = new URL(`${url}${pathname}`);

    // @ts-expect-error
    delete window.location;
    // @ts-expect-error
    window.location = location;
};

const mobileMenuOpen = async () => {
    const state = {
        ...defaultState,
        properties: { isMobile: true },
    };

    const { getByTestId } = await renderiza(state);

    expect(isDisplayed(getByTestId, 'Sair-menu-button')).toBeFalsy();

    const dotMenu = getByTestId('dot-menu');
    expect(dotMenu).toBeDefined();
    dotMenu.click();

    expect(isDisplayed(getByTestId, 'dot-menu-opened')).toBeTruthy();

    return getByTestId;
};

const displayButtonCheck = (
    getByTestId: Function,
    displayedButtons: string[] = [],
    notDisplayedButtons: string[] = [],
) => {
    displayedButtons.forEach((btn: string) => {
        expect(isDisplayed(getByTestId, btn)).toBeTruthy();
    });
    notDisplayedButtons.forEach((btn: string) => {
        expect(isDisplayed(getByTestId, btn)).toBeFalsy();
    });
};

const renderiza = async (state: any) => {
    const mockStore = configureStore();
    const store = mockStore(state);

    return await render(
        <Provider store={store}>
            <MenuAcoes />
        </Provider>,
    );
};

const defaultState = {
    auth: { idFamilia: 'mock' },
    aniversariantes: { loading: false },
    properties: { isMobile: false },
};

const defaultDisplayedButtons = [
    'Sair-menu-button',
    'Cadastrar-menu-button',
    'Listar-menu-button',
];

const defaultNotDisplayedButtons = ['dot-menu'];

const defaultMobileNotDisplayedButtons = ['share-button-menu'];

describe('MenuAcoes component', () => {
    test('verifica a renderização sem login', async () => {
        const state = {
            ...defaultState,
            auth: { idFamilia: '' },
            aniversariantes: { loading: true },
        };

        const { getByTestId } = await renderiza(state);

        const notDisplayedButtons = [
            ...defaultNotDisplayedButtons,
            ...defaultDisplayedButtons,
        ];

        displayButtonCheck(getByTestId, [], notDisplayedButtons);
    });

    test('verifica a renderização na página de aniversariantes do mês', async () => {
        const { getByTestId } = await renderiza(defaultState);

        displayButtonCheck(
            getByTestId,
            defaultDisplayedButtons,
            defaultNotDisplayedButtons,
        );
    });

    test('verifica a renderização do mobile na página de aniversariantes do mês', async () => {
        const getByTestId = await mobileMenuOpen();

        const displayedButtons = [
            'share-button-menu',
            ...defaultDisplayedButtons,
        ];

        displayButtonCheck(getByTestId, displayedButtons, []);
    });

    test('verifica a renderização na página de cadastro de aniversariantes', async () => {
        setPathname('/pessoaCadastro');
        const { getByTestId } = await renderiza(defaultState);

        displayButtonCheck(
            getByTestId,
            defaultDisplayedButtons,
            defaultNotDisplayedButtons,
        );
    });

    test('verifica a renderização do mobile na página de cadastro de aniversariantes', async () => {
        setPathname('/pessoaCadastro');
        const getByTestId = await mobileMenuOpen();

        displayButtonCheck(
            getByTestId,
            defaultDisplayedButtons,
            defaultMobileNotDisplayedButtons,
        );
    });

    test('verifica a renderização na página de listar aniversariantes', async () => {
        setPathname('/aniversariantesLista');
        const { getByTestId } = await renderiza(defaultState);

        displayButtonCheck(
            getByTestId,
            defaultDisplayedButtons,
            defaultNotDisplayedButtons,
        );
    });

    test('verifica a renderização do mobile na página de listar aniversariantes', async () => {
        setPathname('/aniversariantesLista');
        const getByTestId = await mobileMenuOpen();

        displayButtonCheck(
            getByTestId,
            defaultDisplayedButtons,
            defaultMobileNotDisplayedButtons,
        );
    });

    test('verifica a renderização na página de informacoes da pessoa', async () => {
        setPathname('/pessoaInformacoes');
        const { getByTestId } = await renderiza(defaultState);

        displayButtonCheck(
            getByTestId,
            defaultDisplayedButtons,
            defaultNotDisplayedButtons,
        );
    });

    test('verifica a renderização do mobile na página de aniversariantes do mês', async () => {
        setPathname('/pessoaInformacoes');
        const getByTestId = await mobileMenuOpen();

        displayButtonCheck(
            getByTestId,
            defaultDisplayedButtons,
            defaultMobileNotDisplayedButtons,
        );
    });
});
