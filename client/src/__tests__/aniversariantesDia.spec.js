import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import AniversariantesDia from '../components/AniversariantesDia'

let container;
beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
});
afterEach(() => {
    document.body.removeChild(container);
    container = null;
});

jest.mock('../services/Aniversariantes', () => {
    return {
        ListaAniversariantesDia: () => {
            return [{pessoa:'aniversariante_teste',mes:'11',dia:'24'}]
        }
    };
});

describe("TrocaMes component", () => {
    test("verifica se a renderização foi feita de maneira correta", () => {
        act(() => {
            ReactDOM.render(<AniversariantesDia/>, container);
        });
        const aniversariantes_texto = container.getElementsByTagName('span')[1];
        const imagemAlerta = container.getElementsByTagName('i')[0];

        expect(aniversariantes_texto.textContent).toMatch('aniversariante_teste');
        expect(imagemAlerta.className).toMatch(/material-icons/);
        expect(imagemAlerta.textContent).toBe('notifications_active');
    });
});