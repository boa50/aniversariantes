import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import Layout from '../../components/layout';

jest.mock('../../components/header', () => {
    return <div data-testid="headerMock"></div>;
});
jest.mock('../../components/seo', () => {
    return <div data-testid="seoMock"></div>;
});
jest.mock('../../hooks/useAuthCheck', () => {
    const useAuthCheck = () => null;
    return { useAuthCheck };
});

const renderiza = (state: any) => {
    const mockStore = configureStore();
    const store = mockStore(state);

    return render(
        <Provider store={store}>
            <Layout title="LayoutMockado">{<div />}</Layout>
        </Provider>,
    );
};

const defaultState = {
    auth: { loading: false },
};

describe('Layout component', () => {
    test('verifica a renderização correta', () => {
        const { getByTestId } = renderiza(defaultState);

        const header = getByTestId('headerMock');
        const seo = getByTestId('seoMock');

        expect(header).toBeDefined();
        expect(seo).toBeDefined();
    });
});
