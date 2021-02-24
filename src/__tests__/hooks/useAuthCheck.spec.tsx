import React from 'react';
import * as Gatsby from 'gatsby';
import { renderHook } from '@testing-library/react-hooks';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

import * as actions from '../../store/actions';

import { useAuthCheck } from '../../hooks/useAuthCheck';

const mocks: jest.SpyInstance[] = [];
let navigate: jest.SpyInstance<Promise<void>, [number]>;
let mockStore: any;
const location = window.location;

beforeEach(() => {
    navigate = navigateMock();
    mocks.push(navigate);

    mockStore = configureStore();

    // @ts-expect-error
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
    auth: { loading: false, idFamilia: '', authChecked: false },
};

const navigateMock = () => {
    return jest
        .spyOn(Gatsby, 'navigate')
        .mockImplementation((to: number) => Promise.resolve());
};

const initAniversariantesMock = () => {
    return jest
        .spyOn(actions, 'initAniversariantes')
        .mockImplementation((idFamilia: string) => ({
            type: 'check',
            idFamilia: 'mock',
        }));
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

        renderHookResults('/', store);

        expect(navigate).toBeCalledTimes(0);
    });

    test('verifica a situação de não autenticado no /', () => {
        const state = {
            ...defaultState,
            auth: { loading: false, authChecked: true },
        };
        const store = mockStore(state);

        renderHookResults('/', store);

        expect(navigate).toBeCalledTimes(1);
    });

    test('verifica a situação de não autenticado no /login', () => {
        const state = {
            ...defaultState,
            auth: { loading: false, authChecked: true },
        };
        const store = mockStore(state);

        renderHookResults('/login', store);

        expect(navigate).toBeCalledTimes(0);
    });

    test('verifica a situação de autenticado no /', () => {
        const state = {
            ...defaultState,
            auth: { loading: false, idFamilia: 'mock', authChecked: true },
        };
        const store = mockStore(state);

        renderHookResults('/', store);

        expect(navigate).toBeCalledTimes(0);
    });

    test('verifica a situação de autenticado no /login', () => {
        const state = {
            ...defaultState,
            auth: { loading: false, idFamilia: 'mock', authChecked: true },
        };
        const store = mockStore(state);

        renderHookResults('/login', store);

        expect(navigate).toBeCalledTimes(1);
    });

    test('verifica a chamada ao initAniversariantes', () => {
        const initAniversariantes = initAniversariantesMock();
        mocks.push(initAniversariantes);

        const state = {
            ...defaultState,
            auth: { idFamilia: 'mock' },
        };
        const store = mockStore(state);

        renderHookResults('/', store);

        expect(initAniversariantes).toBeCalledTimes(1);
    });

    test('verifica a não chamada do initAniversariantes', () => {
        const initAniversariantes = initAniversariantesMock();
        mocks.push(initAniversariantes);

        const state = {
            ...defaultState,
            auth: { idFamilia: '' },
        };
        const store = mockStore(state);

        renderHookResults('/login', store);

        expect(initAniversariantes).toBeCalledTimes(0);
    });
});
