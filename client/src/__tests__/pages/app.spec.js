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

jest.mock('../../utils/DateUtils.js', () => {
    return {
        getMesAtual: () => 10,
        getDiaAtual: () => 22,
        getMonthNameFromNumber: () => 'Outubro'
    };
});

describe("TrocaMes component", () => {
    test("verifica se a renderização foi feita de maneira correta", () => {
        // mockAniversariantesDia = [{ pessoa: 'joãozinho', mes: '11', dia: '24' }];
        act(() => {
            ReactDOM.render(<App />, container);
        });
        // const aniversariantesTexto = container.getElementsByTagName('span')[1];
        // const imagemAlerta = container.getElementsByTagName('i')[0];

        // expect(aniversariantesTexto.textContent).toMatch('joãozinho');
        // expect(imagemAlerta.className).toMatch(/material-icons/);
        // expect(imagemAlerta.textContent).toBe('notifications_active');
    });
});