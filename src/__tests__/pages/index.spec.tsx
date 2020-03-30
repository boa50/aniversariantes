import React from 'react';
import * as Gatsby from 'gatsby';
import { render, wait } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import { Aniversariante } from '../../models/Aniversariante';
import App from '../../pages/index';

beforeEach(() => {
    const useStaticQuery = jest.spyOn(Gatsby, 'useStaticQuery');
    useStaticQuery.mockImplementation(() => ({
        site: {
            siteMetadata: {
                title: 'Aniversariantes',
            },
        },
    }));
});

let mockAniversariantes = [
    { pessoa: 'joãozinho', mes: '10', dia: '22' },
    { pessoa: 'pedinho', mes: '10', dia: '25' },
    { pessoa: 'mariazinha', mes: '10', dia: '22' },
    { pessoa: 'testinho', mes: '11', dia: '22' },
];
jest.mock('../../services/aniversariantes', () => {
    return {
        getAniversariantes: () =>
            new Promise<Aniversariante[]>((resolve, reject) => {
                resolve(mockAniversariantes);
            }),
    };
});
jest.mock('../../utils/aniversariantesUtils', () => {
    return {
        getAniversariantesMes: () => [
            mockAniversariantes[0],
            mockAniversariantes[1],
            mockAniversariantes[2],
        ],
        getAniversariantesDia: () => [
            mockAniversariantes[0],
            mockAniversariantes[2],
        ],
    };
});

const mockMesInicial = 10;
const mockMesAlterado = 11;
const mockMesInicialTexto = 'Outubro';
const mockMesAlteradoTexto = 'Novembro';
jest.mock('../../utils/dateUtils', () => {
    return {
        getMesAtual: () => mockMesInicial,
        getDiaAtual: () => 22,
        getMonthNameFromNumber: (mesNumero: number) => {
            switch (mesNumero) {
                case mockMesInicial:
                    return mockMesInicialTexto;
                case mockMesAlterado:
                    return mockMesAlteradoTexto;
            }
        },
    };
});

jest.mock('../../components/header', () => {
    return () => <div className="HeaderMock"></div>;
});

jest.mock('../../components/aniversariantesDia', () => {
    return () => <div className="AniversariantesDiaMock"></div>;
});

type Props = {
    mes: number;
    changeHandler: (event: React.ChangeEvent<unknown>, page: number) => void;
};

jest.mock('../../components/trocaMes', () => {
    return ({ mes, changeHandler }: Props) => {
        let eventNulo: React.ChangeEvent<unknown>;

        const mockChamaListener = () =>
            changeHandler(eventNulo, mockMesAlterado);

        return (
            <div className="TrocaMesMock">
                <button onClick={mockChamaListener}></button>
            </div>
        );
    };
});

jest.mock('../../components/listaAniversariantes', () => {
    return () => <div className="ListaAniversariantesMock"></div>;
});

const sleep = (ms: number) => new Promise(res => setTimeout(res, ms));

describe('App page', () => {
    test('verifica se a renderização foi feita de maneira correta', async () => {
        const { container, getByTestId } = render(<App />);
        await sleep(10);

        const headerMock = container.getElementsByClassName('HeaderMock');
        const aniversariantesDiaMock = container.getElementsByClassName(
            'AniversariantesDiaMock',
        );
        const trocaMesMock = container.getElementsByClassName('TrocaMesMock');
        const listaAniversariantesMock = container.getElementsByClassName(
            'ListaAniversariantesMock',
        );
        const mesNome = getByTestId('mes-nome');

        expect(mesNome.textContent).toBe(mockMesInicialTexto);

        expect(headerMock.length).toBe(1);
        expect(aniversariantesDiaMock.length).toBe(1);
        expect(trocaMesMock.length).toBe(1);
        expect(listaAniversariantesMock.length).toBe(1);

        expect(headerMock[0]).toBeDefined();
        expect(aniversariantesDiaMock[0]).toBeDefined();
        expect(trocaMesMock[0]).toBeDefined();
        expect(listaAniversariantesMock[0]).toBeDefined();
    });

    test('verifica a troca dos meses', async () => {
        const { container, getByTestId } = render(<App />);
        await sleep(10);

        const trocaMesMock = container.getElementsByClassName(
            'TrocaMesMock',
        )[0];
        const mesNome = getByTestId('mes-nome');

        expect(mesNome.textContent).toBe(mockMesInicialTexto);
        trocaMesMock.getElementsByTagName('button')[0].click();
        expect(mesNome.textContent).toBe(mockMesAlteradoTexto);
    });
});
