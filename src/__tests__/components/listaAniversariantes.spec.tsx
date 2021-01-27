import React from 'react';
import * as Gatsby from 'gatsby';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import { isDisplayed } from '../testUtils';

import ListaAniversariantes from '../../components/listaAniversariantes';

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

const navigateMock = () => {
    return jest
        .spyOn(Gatsby, 'navigate')
        .mockImplementation((to: number) => Promise.resolve());
};

const renderiza = async (state: any) => {
    const store = mockStore(state);

    return await render(
        <Provider store={store}>
            <ListaAniversariantes />
        </Provider>,
    );
};

const defaultState = {
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

describe('ListaAniversariantes component', () => {
    test('verifica se a renderização de uma lista vazia', async () => {
        const state = { aniversariantes: { aniversariantesMes: [] } };
        const { getByTestId } = await renderiza(state);

        const mensagem = getByTestId('sem-aniversariantes-mensagem');

        expect(isDisplayed(getByTestId, 'aniversariantes-tabela')).toBeFalsy();
        expect(mensagem.textContent).toBe('Sem aniversariantes no mês');
    });

    test('verifica se a renderização de uma lista preenchida', async () => {
        const { getByTestId, getAllByTestId } = await renderiza(defaultState);

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

    test('verifica se os aniversariantes estão ordenados', async () => {
        const dia1 = '25';
        const dia2 = '24';

        const state = {
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

        const { getAllByTestId } = await renderiza(state);

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

    test('verifica mudança de página ao selecionar uma pessoa', async () => {
        const { getAllByTestId } = await renderiza(defaultState);
        const id = 0;

        const aniversariante = getAllByTestId('aniversariante-nome')[id];

        await waitFor(() => {
            fireEvent.click(aniversariante);
        });

        expect(navigate).toBeCalledTimes(1);
        expect(navigate).toBeCalledWith('/pessoaInformacoes/', {
            state: {
                nome:
                    defaultState.aniversariantes.aniversariantesMes[id].pessoa,
                nascimento:
                    defaultState.aniversariantes.aniversariantesMes[id]
                        .nascimento,
            },
        });
    });
});
