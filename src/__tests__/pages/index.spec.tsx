import React from 'react';
import * as Gatsby from 'gatsby';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import * as actions from '../../store/actions';

import App from '../../pages/index';

beforeEach(() => {
    const useStaticQuery = jest.spyOn(Gatsby, 'useStaticQuery');
    useStaticQuery.mockImplementation(() => ({
        site: {
            siteMetadata: {
                title: 'Aniversariantes',
            },
        },
    }));
});

const mocks: jest.SpyInstance[] = [];
afterEach(() => {
    mocks.forEach((mock: jest.SpyInstance) => {
        mock.mockClear();
    });
    mocks.length = 0;
});

type LayoutProps = {
    children: React.ReactNode;
};
jest.mock('../../components/layout', () => {
    return ({ children }: LayoutProps) => (
        <div data-testid="Layout">{children}</div>
    );
});

jest.mock('../../components/aniversariantesDia', () => {
    return () => <div data-testid="AniversariantesDiaMock"></div>;
});

jest.mock('../../components/trocaMes', () => {
    return () => <div data-testid="TrocaMesMock"></div>;
});

jest.mock('../../components/listaAniversariantes', () => {
    return () => <div data-testid="ListaAniversariantesMock"></div>;
});
jest.mock('../../hooks/useNotifications', () => {
    const useNotifications = () => null;
    return { useNotifications };
});

const renderiza = (state: any) => {
    const mockStore = configureStore();
    const store = mockStore(state);

    return render(
        <Provider store={store}>
            <App />
        </Provider>,
    );
};

const mockMesNumero = 10;
const mockMesTexto = 'Outubro';

const defaultState = {
    aniversariantes: {
        mes: mockMesNumero,
        loading: true,
    },
    auth: { loading: true, idFamilia: '' },
    properties: { isMobile: false },
};

describe('Index page', () => {
    test('verifica se a renderização foi feita de maneira correta', () => {
        const state = {
            ...defaultState,
            aniversariantes: {
                ...defaultState.aniversariantes,
                loading: false,
            },
            auth: { loading: false, idFamilia: 'mock' },
        };

        const initAniversariantes = jest
            .spyOn(actions, 'initAniversariantes')
            .mockImplementation((idFamilia: string) => ({
                type: 'check',
                idFamilia: 'mock',
            }));
        mocks.push(initAniversariantes);

        const { getByTestId } = renderiza(state);

        const aniversariantesDiaMock = getByTestId('AniversariantesDiaMock');
        const trocaMesMock = getByTestId('TrocaMesMock');
        const listaAniversariantesMock = getByTestId(
            'ListaAniversariantesMock',
        );
        const mesNome = getByTestId('mes-nome');

        expect(initAniversariantes).toBeCalledTimes(1);
        expect(mesNome.textContent).toBe(mockMesTexto);
        expect(aniversariantesDiaMock).toBeDefined();
        expect(trocaMesMock).toBeDefined();
        expect(listaAniversariantesMock).toBeDefined();
    });

    test('verifica se carrega o icone de loading', () => {
        const { getByTestId } = renderiza(defaultState);

        const loadingIcon = getByTestId('loading-aniversariantes');

        expect(loadingIcon).toBeDefined();
    });
});
