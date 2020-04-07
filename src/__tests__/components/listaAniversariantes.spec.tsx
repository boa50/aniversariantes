import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import ListaAniversariantes from '../../components/listaAniversariantes';

describe('ListaAniversariantes component', () => {
    const mockStore = configureStore();
    let store, state;

    test('verifica se a renderização de uma lista vazia', () => {
        state = { aniversariantesMes: [] };
        store = mockStore(state);

        const { getByTestId } = render(
            <Provider store={store}>
                <ListaAniversariantes />
            </Provider>,
        );

        let erro = '';
        try {
            getByTestId('aniversariantes-tabela');
        } catch (error) {
            erro = error;
        }
        const mensagem = getByTestId('sem-aniversariantes-mensagem');

        expect(erro).toBeTruthy();
        expect(mensagem.textContent).toBe('Sem aniversariantes no mês');
    });

    test('verifica se a renderização de uma lista preenchida', () => {
        state = {
            aniversariantesMes: [
                { pessoa: 'aniversariante_teste', mes: '11', dia: '24' },
                { pessoa: 'aniversariante_teste2', mes: '11', dia: '25' },
            ],
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
        state = {
            aniversariantesMes: [
                { pessoa: 'aniversariante_teste', mes: '11', dia: '25' },
                { pessoa: 'aniversariante_teste2', mes: '11', dia: '24' },
            ],
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
            state.aniversariantesMes[1].pessoa,
        );
        expect(aniversariante1Dia.textContent).toBe(
            state.aniversariantesMes[1].dia,
        );
        expect(aniversariante2.textContent).toBe(
            state.aniversariantesMes[0].pessoa,
        );
        expect(aniversariante2Dia.textContent).toBe(
            state.aniversariantesMes[0].dia,
        );
    });
});
