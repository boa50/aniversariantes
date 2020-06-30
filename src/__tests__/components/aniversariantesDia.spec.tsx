import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import { isDisplayed } from '../testUtils';

import AniversariantesDia from '../../components/aniversariantesDia';

describe('AniversariantesDia component', () => {
    const mockStore = configureStore();
    let store, state;

    test('verifica se a renderização foi feita de maneira correta para 1 aniversariante', () => {
        state = {
            aniversariantes: {
                aniversariantesDia: [
                    { pessoa: 'joãozinho', mes: '11', dia: '24' },
                ],
            },
        };
        store = mockStore(state);

        const { getByTestId } = render(
            <Provider store={store}>
                <AniversariantesDia />
            </Provider>,
        );
        const aniversariantesTexto = getByTestId('aniversariante-texto');
        const imagemAlerta = getByTestId('aniversariante-icone');

        expect(aniversariantesTexto.textContent).toMatch('joãozinho');
        expect(imagemAlerta).toBeDefined();
    });

    test('verifica se a renderização foi feita de maneira correta para 0 aniversariantes', () => {
        state = { aniversariantes: { aniversariantesDia: [] } };
        store = mockStore(state);

        const { getByTestId } = render(
            <Provider store={store}>
                <AniversariantesDia />
            </Provider>,
        );

        expect(isDisplayed(getByTestId, 'aniversariante-texto')).toBeFalsy();
    });

    test('verifica se a renderização foi feita de maneira correta para vários aniversariante', () => {
        state = {
            aniversariantes: {
                aniversariantesDia: [
                    { pessoa: 'pedinho', mes: '11', dia: '24' },
                    { pessoa: 'jumentinho', mes: '11', dia: '25' },
                ],
            },
        };
        store = mockStore(state);

        const { getByTestId } = render(
            <Provider store={store}>
                <AniversariantesDia />
            </Provider>,
        );
        const aniversariantesTexto = getByTestId('aniversariante-texto');
        const imagemAlerta = getByTestId('aniversariante-icone');

        expect(aniversariantesTexto.textContent).toMatch('pedinho');
        expect(aniversariantesTexto.textContent).toMatch(',');
        expect(aniversariantesTexto.textContent).toMatch('jumentinho');
        expect(imagemAlerta).toBeDefined();
    });
});
