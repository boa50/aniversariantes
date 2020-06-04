import React from 'react';
import * as Gatsby from 'gatsby';
import { renderHook, act } from '@testing-library/react-hooks';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';
import { Provider } from 'react-redux';

import { useAuthCheck } from '../../hooks/useAuthCheck';

const mocks: jest.SpyInstance[] = [];
afterEach(() => {
    mocks.forEach((mock: jest.SpyInstance) => {
        mock.mockClear();
    });
    mocks.length = 0;
});

const defaultState = {
    auth: { loading: true, idFamilia: '' },
};

const navigateMock = () => {
    return jest
        .spyOn(Gatsby, 'navigate')
        .mockImplementation((to: number) => Promise.resolve());
};

describe('useAuthCheck Hook', () => {
    test('verifica a situação de loading', () => {
        const navigate = navigateMock();
        mocks.push(navigate);

        const mockStore = configureStore();
        const store = mockStore(defaultState);
        const location = window.location;
        delete window.location;
        window.location = { ...location, pathname: '/' };

        const wrapper: React.FC = ({ children }) => (
            <Provider store={store}>{children}</Provider>
        );

        const { result } = renderHook(() => useAuthCheck(window.location), {
            wrapper,
        });

        expect(navigate).toBeCalledTimes(0);
        expect(result.current).toBeUndefined();
    });

    test('verifica a situação de não autenticado no /', () => {
        const navigate = navigateMock();
        mocks.push(navigate);

        const mockStore = configureStore();
        const state = {
            ...defaultState,
            auth: { loading: false },
        };
        const store = mockStore(state);
        const location = window.location;
        delete window.location;
        window.location = { ...location, pathname: '/' };

        const wrapper: React.FC = ({ children }) => (
            <Provider store={store}>{children}</Provider>
        );

        const { result } = renderHook(() => useAuthCheck(window.location), {
            wrapper,
        });

        expect(navigate).toBeCalledTimes(1);
        expect(result.current).toBeFalsy();
    });

    test('verifica a situação de não autenticado no /login', () => {
        const navigate = navigateMock();
        mocks.push(navigate);

        const mockStore = configureStore();
        const state = {
            ...defaultState,
            auth: { loading: false },
        };
        const store = mockStore(state);

        const location = window.location;
        delete window.location;
        window.location = { ...location, pathname: '/login' };

        const wrapper: React.FC = ({ children }) => (
            <Provider store={store}>{children}</Provider>
        );

        const { result } = renderHook(() => useAuthCheck(window.location), {
            wrapper,
        });

        expect(navigate).toBeCalledTimes(0);
        expect(result.current).toBeFalsy();
    });
});
