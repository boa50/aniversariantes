import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import ListaAniversariantes from '../../components/listaAniversariantes'

let container;
beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
});
afterEach(() => {
    document.body.removeChild(container);
    container = null;
});

describe("ListaAniversariantes component", () => {
    test("verifica se a renderização de uma lista vazia", () => {
        const aniversariantes = []

        act(() => {
            ReactDOM.render(<ListaAniversariantes aniversariantes={aniversariantes}/>, container);
        });

        const tabela = container.getElementsByTagName('table')[0];
        const mensagem = container.getElementsByTagName('h5')[0];

        expect(tabela).toBe(undefined);
        expect(mensagem.textContent).toBe('Sem aniversariantes no mês');
    });

    test("verifica se a renderização de uma lista preenchida", () => {
        const aniversariantes = [
            {pessoa:'aniversariante_teste',mes:'11',dia:'24'},
            {pessoa:'aniversariante_teste2',mes:'11',dia:'25'}
        ]

        act(() => {
            ReactDOM.render(<ListaAniversariantes aniversariantes={aniversariantes}/>, container);
        });

        const tabela = container.getElementsByTagName('table')[0];
        const aniversariantesHeader = container.getElementsByTagName('th')[0];
        const diaHeader = container.getElementsByTagName('th')[1];
        const linhasQuantidade = container.getElementsByTagName('tr').length;

        expect(tabela.className).toMatch(/centered hightlight/);
        expect(aniversariantesHeader.textContent).toBe('Aniversariante');
        expect(diaHeader.textContent).toBe('Dia');
        expect(linhasQuantidade).toBe(3);
    });

    test("verifica se os aniversariantes estão ordenados", () => {
        const aniversariantes = [
            {pessoa:'aniversariante_teste',mes:'11',dia:'25'},
            {pessoa:'aniversariante_teste2',mes:'11',dia:'24'}
        ]

        act(() => {
            ReactDOM.render(<ListaAniversariantes aniversariantes={aniversariantes}/>, container);
        });

        const aniversariante1 = container.getElementsByTagName('td')[0];
        const aniversariante1Dia = container.getElementsByTagName('td')[1];
        const aniversariante2 = container.getElementsByTagName('td')[2];
        const aniversariante2Dia = container.getElementsByTagName('td')[3];

        expect(aniversariante1.textContent).toBe(aniversariantes[1].pessoa);
        expect(aniversariante1Dia.textContent).toBe(aniversariantes[1].dia);
        expect(aniversariante2.textContent).toBe(aniversariantes[0].pessoa);
        expect(aniversariante2Dia.textContent).toBe(aniversariantes[0].dia);
    });
});