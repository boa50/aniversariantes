import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import App from '../../pages/App';

let container;
beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
});
afterEach(() => {
    document.body.removeChild(container);
    container = null;
});

let mockAniversariantes = [
    { pessoa: 'joãozinho', mes: '10', dia: '22' },
    { pessoa: 'pedinho', mes: '10', dia: '25' },
    { pessoa: 'mariazinha', mes: '10', dia: '22' },
    { pessoa: 'testinho', mes: '11', dia: '22' }
];
jest.mock('../../services/Aniversariantes', () => {
    return {
        ListaAniversariantes: () => mockAniversariantes,
        ListaAniversariantesMes: () => [
            mockAniversariantes[0],
            mockAniversariantes[1],
            mockAniversariantes[2]
        ],
        ListaAniversariantesDia: () => [
            mockAniversariantes[0],
            mockAniversariantes[2]
        ],
    };
});

const mockMesInicial = 10;
const mockMesAlterado = 11;
const mockMesInicialTexto = 'Outubro';
const mockMesAlteradoTexto = 'Novembro';
jest.mock('../../utils/DateUtils.js', () => {
    return {
        getMesAtual: () => mockMesInicial,
        getDiaAtual: () => 22,
        getMonthNameFromNumber: (mesNumero) => {
            switch (mesNumero) {
                case mockMesInicial:
                    return mockMesInicialTexto;
                case mockMesAlterado:
                    return mockMesAlteradoTexto;
            }
        }
    };
});

jest.mock('../../components/Header.js', () => {
    return () => <div className='HeaderMock'></div>
});

jest.mock('../../components/AniversariantesDia.js', () => {
    return () => <div className='AniversariantesDiaMock'></div>
});

jest.mock('../../components/TrocaMes.js', () => {
    return (props) => {
        const mockChamaListener = () => props.listener(mockMesAlterado);

        return (
            <div className='TrocaMesMock'>
                <button onClick={mockChamaListener}></button>
            </div>
        )
    }
});

jest.mock('../../components/ListaAniversariantes.js', () => {
    return () => <div className='ListaAniversariantesMock'></div>
});

describe("TrocaMes component", () => {
    test("verifica se a renderização foi feita de maneira correta", () => {
        act(() => {
            ReactDOM.render(<App />, container);
        });
        const headerMock = container.getElementsByClassName('HeaderMock');
        const aniversariantesDiaMock = container.getElementsByClassName('AniversariantesDiaMock');
        const trocaMesMock = container.getElementsByClassName('TrocaMesMock');
        const listaAniversariantesMock = container.getElementsByClassName('ListaAniversariantesMock');
        const mesNome = container.getElementsByTagName('h2')[0];

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

    test("verifica a troca dos meses", () => {
        act(() => {
            ReactDOM.render(<App />, container);
        });

        const trocaMesMock = container.getElementsByClassName('TrocaMesMock')[0];
        const mesNome = container.getElementsByTagName('h2')[0];

        expect(mesNome.textContent).toBe(mockMesInicialTexto);
        trocaMesMock.getElementsByTagName('button')[0].click()
        expect(mesNome.textContent).toBe(mockMesAlteradoTexto);
    });
});