import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import AniversariantesDia from '../components/AniversariantesDia'
import aniversariantes from "../assests/aniversariantes";

let container;
beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
});
afterEach(() => {
    document.body.removeChild(container);
    container = null;
});

let mockAniversariantesDia = []
jest.mock('../services/Aniversariantes', () => {
    return {ListaAniversariantesDia: () => mockAniversariantesDia};
});

describe("TrocaMes component", () => {
    test("verifica se a renderização foi feita de maneira correta para 1 aniversariante", () => {
        mockAniversariantesDia = [{pessoa:'joãozinho',mes:'11',dia:'24'}];
        act(() => {
            ReactDOM.render(<AniversariantesDia/>, container);
        });
        const aniversariantesTexto = container.getElementsByTagName('span')[1];
        const imagemAlerta = container.getElementsByTagName('i')[0];

        expect(aniversariantesTexto.textContent).toMatch('joãozinho');
        expect(imagemAlerta.className).toMatch(/material-icons/);
        expect(imagemAlerta.textContent).toBe('notifications_active');
    });

    test("verifica se a renderização foi feita de maneira correta para 0 aniversariantes", () => {
        mockAniversariantesDia = [];
        act(() => {
            ReactDOM.render(<AniversariantesDia/>, container);
        });
        const aniversariantesTexto = container.getElementsByTagName('span')[1];

        expect(aniversariantesTexto).toBe(undefined);
    });

    test("verifica se a renderização foi feita de maneira correta para vários aniversariante", () => {
        mockAniversariantesDia = [
            {pessoa:'pedinho',mes:'11',dia:'24'},
            {pessoa:'jumentinho',mes:'11',dia:'25'}
        ];
        act(() => {
            ReactDOM.render(<AniversariantesDia/>, container);
        });
        const aniversariantesTexto = container.getElementsByTagName('span')[1];
        const imagemAlerta = container.getElementsByTagName('i')[0];

        expect(aniversariantesTexto.textContent).toMatch('pedinho');
        expect(aniversariantesTexto.textContent).toMatch(',');
        expect(aniversariantesTexto.textContent).toMatch('jumentinho');
        expect(imagemAlerta.className).toMatch(/material-icons/);
        expect(imagemAlerta.textContent).toBe('notifications_active');
    });
});