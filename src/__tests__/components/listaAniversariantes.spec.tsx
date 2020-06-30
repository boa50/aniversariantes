import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import { isDisplayed } from '../testUtils';

import ListaAniversariantes from '../../components/listaAniversariantes';

describe('ListaAniversariantes component', () => {
    const mockStore = configureStore();
    let store, state;

    test('verifica se a renderização de uma lista vazia', () => {
        state = { aniversariantes: { aniversariantesMes: [] } };
        store = mockStore(state);

        const { getByTestId } = render(
            <Provider store={store}>
                <ListaAniversariantes />
            </Provider>,
        );

        const mensagem = getByTestId('sem-aniversariantes-mensagem');

        expect(isDisplayed(getByTestId, 'aniversariantes-tabela')).toBeFalsy();
        expect(mensagem.textContent).toBe('Sem aniversariantes no mês');
    });

    test('verifica se a renderização de uma lista preenchida', () => {
        state = {
            aniversariantes: {
                aniversariantesMes: [
                    {
                        pessoa: 'aniversariante_teste',
                        nascimento: new Date('2000-11-24T03:00:00Z'),
                    },
                    {
                        pessoa: 'aniversariante_teste2',
                        nascimento: new Date('2000-11-25T03:00:00Z'),
                    },
                ],
            },
        };
        store = mockStore(state);

        const { getByTestId, getAllByTestId } = render(
            <Provider store={store}>
                <ListaAniversariantes />
            </Provider>,
        );

        const tabela = getByTestId('aniversariantes-tabela');
        const aniversariantesHeader = getByTestId(
            'aniversariantes-nome-header',
        );
        const diaHeader = getByTestId('aniversariantes-dia-header');
        const linhasQuantidade = getAllByTestId('aniversariantes-linha').length;

        expect(tabela.className).toMatch(/MuiTableContainer-root/);
        expect(aniversariantesHeader.textContent).toBe('Aniversariante');
        expect(diaHeader.textContent).toBe('Dia');
        expect(linhasQuantidade).toBe(2);
    });

    test('verifica se os aniversariantes estão ordenados', () => {
        const dia1 = '25';
        const dia2 = '24';

        state = {
            aniversariantes: {
                aniversariantesMes: [
                    {
                        pessoa: 'aniversariante_teste',
                        nascimento: new Date('2000-11-' + dia1 + 'T03:00:00Z'),
                    },
                    {
                        pessoa: 'aniversariante_teste2',
                        nascimento: new Date('2000-11-' + dia2 + 'T03:00:00Z'),
                    },
                ],
            },
        };
        store = mockStore(state);

        const { getAllByTestId } = render(
            <Provider store={store}>
                <ListaAniversariantes />
            </Provider>,
        );

        const aniversariante1 = getAllByTestId('aniversariante-nome')[0];
        const aniversariante1Dia = getAllByTestId('aniversariante-dia')[0];
        const aniversariante2 = getAllByTestId('aniversariante-nome')[1];
        const aniversariante2Dia = getAllByTestId('aniversariante-dia')[1];

        expect(aniversariante1.textContent).toBe(
            state.aniversariantes.aniversariantesMes[1].pessoa,
        );
        expect(aniversariante1Dia.textContent).toBe(dia2);
        expect(aniversariante2.textContent).toBe(
            state.aniversariantes.aniversariantesMes[0].pessoa,
        );
        expect(aniversariante2Dia.textContent).toBe(dia1);
    });
});
