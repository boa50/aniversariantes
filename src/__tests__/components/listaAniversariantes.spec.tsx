import React from 'react';
import * as Gatsby from 'gatsby';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import { isDisplayed } from '../testUtils';

import ListaAniversariantes from '../../components/listaAniversariantes';

import { List } from 'immutable';
import ListUtils from '../../utils/listUtils';
import { Aniversariante } from '../../models/Aniversariante';

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

const navigateMock = () => {
    return jest
        .spyOn(Gatsby, 'navigate')
        .mockImplementation((to: number) => Promise.resolve());
};

const renderiza = async (state: any, mensal: boolean = false) => {
    const store = mockStore(state);

    return await render(
        <Provider store={store}>
            {/* Feito desse jeito só para aumentar a cobertura de testes */}
            {mensal ? (
                <ListaAniversariantes mensal={mensal} />
            ) : (
                <ListaAniversariantes />
            )}
        </Provider>,
    );
};

const defaultState = {
    aniversariantes: {
        aniversariantes: [
            {
                pessoa: 'aniversariante_teste',
                nascimento: new Date('2000-11-24T03:00:00Z'),
            },
            {
                pessoa: 'aniversariante_teste2',
                nascimento: new Date('2000-11-25T03:00:00Z'),
            },
            {
                pessoa: 'aniversariante_teste3',
                nascimento: new Date('2000-10-25T03:00:00Z'),
            },
            {
                pessoa: 'aniversariante_teste2',
                nascimento: new Date('2020-11-25T03:00:00Z'),
            },
        ],
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
    test('verifica se a renderização de uma lista mensal vazia', async () => {
        const state = { aniversariantes: { aniversariantesMes: [] } };
        const { getByTestId } = await renderiza(state, true);

        const mensagem = getByTestId('sem-aniversariantes-mensagem');

        expect(isDisplayed(getByTestId, 'aniversariantes-tabela')).toBeFalsy();
        expect(mensagem.textContent).toBe('Sem aniversariantes no mês');
    });

    test('verifica se a renderização de uma lista completa vazia', async () => {
        const state = { aniversariantes: { aniversariantes: [] } };
        const { getByTestId } = await renderiza(state);

        const mensagem = getByTestId('sem-aniversariantes-mensagem');

        expect(isDisplayed(getByTestId, 'aniversariantes-tabela')).toBeFalsy();
        expect(mensagem.textContent).toBe('Sem aniversariantes cadastrados');
    });

    test('verifica se a renderização de uma lista mensal preenchida', async () => {
        const { getByTestId, getAllByTestId } = await renderiza(
            defaultState,
            true,
        );

        const tabela = getByTestId('aniversariantes-tabela');
        const aniversariantesHeader = getByTestId(
            'aniversariantes-nome-header',
        );
        const diaHeader = getByTestId('aniversariantes-dia-header');
        const linhasQuantidade = getAllByTestId('aniversariantes-linha').length;

        expect(
            isDisplayed(getByTestId, 'aniversariantes-tabela-busca'),
        ).toBeFalsy();
        expect(tabela.className).toMatch(/MuiTableContainer-root/);
        expect(aniversariantesHeader.textContent).toBe('Aniversariante');
        expect(diaHeader.textContent).toBe('Dia');
        expect(linhasQuantidade).toBe(2);
    });

    test('verifica se a renderização de uma lista completa preenchida', async () => {
        const { getByTestId, getAllByTestId } = await renderiza(defaultState);

        const tabela = getByTestId('aniversariantes-tabela');
        const aniversariantesHeader = getByTestId(
            'aniversariantes-nome-header',
        );
        const diaHeader = getByTestId('aniversariantes-nascimento-header');
        const linhasQuantidade = getAllByTestId('aniversariantes-linha').length;

        expect(
            isDisplayed(getByTestId, 'aniversariantes-tabela-busca'),
        ).toBeTruthy();
        expect(tabela.className).toMatch(/MuiTableContainer-root/);
        expect(aniversariantesHeader.textContent).toBe('Aniversariante');
        expect(diaHeader.textContent).toBe('Nascimento');
        expect(linhasQuantidade).toBe(4);
    });

    test('verifica se os aniversariantes do mes estão ordenados', async () => {
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

        const { getAllByTestId } = await renderiza(state, true);

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

    test('verifica se a lista completa está ordenada', async () => {
        const state = {
            aniversariantes: {
                aniversariantes: [
                    {
                        pessoa: 'aniversariante_teste3',
                        nascimento: new Date('2000-11-24T03:00:00Z'),
                    },
                    {
                        pessoa: 'aniversariante_teste2',
                        nascimento: new Date('2000-11-25T03:00:00Z'),
                    },
                    {
                        pessoa: 'aniversariante_teste',
                        nascimento: new Date('2000-10-25T03:00:00Z'),
                    },
                    {
                        pessoa: 'aniversariante_teste2',
                        nascimento: new Date('2020-11-25T03:00:00Z'),
                    },
                ],
            },
        };

        const { getAllByTestId } = await renderiza(state);

        const aniversariante1 = getAllByTestId('aniversariante-nome')[0];
        const aniversariante1Nascimento = getAllByTestId(
            'aniversariante-nascimento',
        )[0];
        const aniversariante2 = getAllByTestId('aniversariante-nome')[1];
        const aniversariante2Nascimento = getAllByTestId(
            'aniversariante-nascimento',
        )[1];
        const aniversariante3 = getAllByTestId('aniversariante-nome')[2];
        const aniversariante3Nascimento = getAllByTestId(
            'aniversariante-nascimento',
        )[2];
        const aniversariante4 = getAllByTestId('aniversariante-nome')[3];
        const aniversariante4Nascimento = getAllByTestId(
            'aniversariante-nascimento',
        )[3];

        /* As datas foram comparadas assim por causa de um problema no locale do Netlify */
        expect(aniversariante1.textContent).toBe(
            state.aniversariantes.aniversariantes[2].pessoa,
        );
        expect(aniversariante1Nascimento.textContent?.split('/')).toEqual(
            expect.arrayContaining(['25', '10', '2000']),
        );
        expect(aniversariante2.textContent).toBe(
            state.aniversariantes.aniversariantes[1].pessoa,
        );
        expect(aniversariante2Nascimento.textContent?.split('/')).toEqual(
            expect.arrayContaining(['25', '11', '2000']),
        );
        expect(aniversariante3.textContent).toBe(
            state.aniversariantes.aniversariantes[3].pessoa,
        );
        expect(aniversariante3Nascimento.textContent?.split('/')).toEqual(
            expect.arrayContaining(['25', '11', '2020']),
        );
        expect(aniversariante4.textContent).toBe(
            state.aniversariantes.aniversariantes[0].pessoa,
        );
        expect(aniversariante4Nascimento.textContent?.split('/')).toEqual(
            expect.arrayContaining(['24', '11', '2000']),
        );
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

    test('verifica mudança de ordenação na lista completa', async () => {
        const sortMock = jest
            .spyOn(ListUtils, 'stableSort')
            .mockImplementation(
                (array: any, comparator: Function) =>
                    List() as List<Aniversariante>,
            );
        mocks.push(sortMock);

        const { getByTestId } = await renderiza(defaultState);

        const aniversariantesHeader = getByTestId(
            'aniversariantes-nome-sortLabel',
        );

        await waitFor(() => {
            fireEvent.click(aniversariantesHeader);
        });

        expect(sortMock).toBeCalledTimes(1);
        expect(aniversariantesHeader.children[0]).toHaveClass(
            'MuiTableSortLabel-iconDirectionAsc',
        );

        await waitFor(() => {
            fireEvent.click(aniversariantesHeader);
        });

        expect(sortMock).toBeCalledTimes(2);
        expect(aniversariantesHeader.children[0]).toHaveClass(
            'MuiTableSortLabel-iconDirectionDesc',
        );
    });

    test('verifica a filtragem realizada pela busca', async () => {
        const { getByTestId, getAllByTestId } = await renderiza(defaultState);

        const buscaMockNome = 'teste2';
        const buscaInput = getByTestId('aniversariantes-tabela-busca')
            .children[0] as HTMLInputElement;

        await waitFor(() => {
            fireEvent.change(buscaInput, {
                target: { value: buscaMockNome },
            });
        });

        const linhas = getAllByTestId('aniversariantes-linha');
        const linhasQuantidade = linhas.length;

        expect(buscaInput.value).toBe(buscaMockNome);
        expect(linhasQuantidade).toBe(2);

        linhas.forEach(linha => {
            expect(linha.children[0].innerHTML).toContain(buscaMockNome);
        });
    });

    test('verifica a filtragem com retorno vazio realizada pela busca', async () => {
        const { getByTestId } = await renderiza(defaultState);

        const buscaMockNome = 'teste2Legal';
        const buscaInput = getByTestId('aniversariantes-tabela-busca')
            .children[0] as HTMLInputElement;

        await waitFor(() => {
            fireEvent.change(buscaInput, {
                target: { value: buscaMockNome },
            });
        });

        expect(isDisplayed(getByTestId, 'aniversariantes-linha')).toBeFalsy();
    });

    test('verifica o cancelamento da filtragem da busca', async () => {
        const { getByTestId, getAllByTestId } = await renderiza(defaultState);

        const buscaMockNome = 'teste2';

        const tabela = getByTestId('aniversariantes-tabela');
        const buscaInput = getByTestId('aniversariantes-tabela-busca')
            .children[0] as HTMLInputElement;

        const buscaCancelarBotao = tabela.children[0]
            .children[2] as HTMLButtonElement;

        await waitFor(() => {
            fireEvent.change(buscaInput, {
                target: { value: buscaMockNome },
            });
        });

        await waitFor(() => {
            fireEvent.click(buscaCancelarBotao);
        });

        const linhasQuantidade = getAllByTestId('aniversariantes-linha').length;

        expect(buscaInput.value).toBe('');
        expect(linhasQuantidade).toBe(4);
    });
});
