import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import { isDisplayed } from '../testUtils';

import Layout from '../../components/layout';

jest.mock('../../components/header', () => {
    return () => <div data-testid="headerMock"></div>;
});
jest.mock('../../components/seo', () => {
    return () => <div data-testid="seoMock"></div>;
});
jest.mock('../../hooks/useAuthCheck', () => {
    const useAuthCheck = () => null;
    return { useAuthCheck };
});

const renderiza = (state: any, scope: 'logged' | 'notLogged') => {
    const mockStore = configureStore();
    const store = mockStore(state);

    return render(
        <Provider store={store}>
            {/* Feito desse jeito só para aumentar a cobertura de testes */}
            {scope === 'logged' ? (
                <Layout title="LayoutMockado" scope={scope}>
                    <div data-testid="child" />
                </Layout>
            ) : (
                <Layout title="LayoutMockado">
                    <div data-testid="child" />
                </Layout>
            )}
        </Provider>,
    );
};

const defaultState = {
    auth: { authChecked: true },
    aniversariantes: { loading: false },
};

describe('Layout component', () => {
    test('verifica a renderização autenticada correta', () => {
        const { getByTestId } = renderiza(defaultState, 'notLogged');

        expect(isDisplayed(getByTestId, 'headerMock')).toBeTruthy();
        expect(isDisplayed(getByTestId, 'seoMock')).toBeTruthy();
        expect(isDisplayed(getByTestId, 'child')).toBeTruthy();
    });

    test('verifica a renderização não autenticada correta', () => {
        const state = {
            ...defaultState,
            auth: { authChecked: false },
        };
        const { getByTestId } = renderiza(state, 'notLogged');

        expect(isDisplayed(getByTestId, 'vazio')).toBeTruthy();
    });

    test('verifica a renderização autenticada de página com escopo logado e carrgando', () => {
        const state = {
            ...defaultState,
            aniversariantes: { loading: true },
        };
        const { getByTestId } = renderiza(state, 'logged');

        expect(isDisplayed(getByTestId, 'headerMock')).toBeTruthy();
        expect(isDisplayed(getByTestId, 'seoMock')).toBeTruthy();
        expect(
            isDisplayed(getByTestId, 'loading-aniversariantes'),
        ).toBeTruthy();
        expect(isDisplayed(getByTestId, 'child')).toBeFalsy();
    });

    test('verifica a renderização autenticada de página com escopo logado e já carrgado', () => {
        const { getByTestId } = renderiza(defaultState, 'logged');

        expect(isDisplayed(getByTestId, 'headerMock')).toBeTruthy();
        expect(isDisplayed(getByTestId, 'seoMock')).toBeTruthy();
        expect(isDisplayed(getByTestId, 'loading-aniversariantes')).toBeFalsy();
        expect(isDisplayed(getByTestId, 'child')).toBeTruthy();
    });
});
