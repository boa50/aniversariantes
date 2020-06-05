import React from 'react';
import * as Gatsby from 'gatsby';
import { renderHook } from '@testing-library/react-hooks';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

import { useAuthCheck } from '../../hooks/useAuthCheck';

const mocks: jest.SpyInstance[] = [];
let navigate: jest.SpyInstance<Promise<void>, [number]>;
let mockStore: any;
const location = window.location;

beforeEach(() => {
    navigate = navigateMock();
    mocks.push(navigate);

    mockStore = configureStore();

    delete window.location;
});

afterEach(() => {
    mocks.forEach((mock: jest.SpyInstance) => {
        mock.mockClear();
    });
    mocks.length = 0;

    window.location = location;
});

const defaultState = {
    auth: { loading: true, idFamilia: '' },
};

const navigateMock = () => {
    return jest
        .spyOn(Gatsby, 'navigate')
        .mockImplementation((to: number) => Promise.resolve());
};

const renderHookResults = (path: string, store: any) => {
    window.location = { ...location, pathname: path };

    const wrapper: React.FC = ({ children }) => (
        <Provider store={store}>{children}</Provider>
    );

    const { result } = renderHook(() => useAuthCheck(window.location), {
        wrapper,
    });

    return result;
};

describe('useAuthCheck Hook', () => {
    test('verifica a situação de loading', () => {
        const store = mockStore(defaultState);

        const result = renderHookResults('/', store);

        expect(navigate).toBeCalledTimes(0);
        expect(result.current).toBeUndefined();
    });

    test('verifica a situação de não autenticado no /', () => {
        const state = {
            ...defaultState,
            auth: { loading: false },
        };
        const store = mockStore(state);

        const result = renderHookResults('/', store);

        expect(navigate).toBeCalledTimes(1);
        expect(result.current).toBeFalsy();
    });

    test('verifica a situação de não autenticado no /login', () => {
        const state = {
            ...defaultState,
            auth: { loading: false },
        };
        const store = mockStore(state);

        const result = renderHookResults('/login', store);

        expect(navigate).toBeCalledTimes(0);
        expect(result.current).toBeUndefined();
    });

    test('verifica a situação de autenticado no /', () => {
        const state = {
            ...defaultState,
            auth: { loading: false, idFamilia: 'mock' },
        };
        const store = mockStore(state);

        const result = renderHookResults('/', store);

        expect(navigate).toBeCalledTimes(0);
        expect(result.current).toBeUndefined();
    });

    test('verifica a situação de autenticado no /login', () => {
        const state = {
            ...defaultState,
            auth: { loading: false, idFamilia: 'mock' },
        };
        const store = mockStore(state);

        const result = renderHookResults('/login', store);

        expect(navigate).toBeCalledTimes(1);
        expect(result.current).toBeTruthy();
    });
});
