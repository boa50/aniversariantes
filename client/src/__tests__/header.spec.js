import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import Header from '../components/Header';
import { Context as ResponsiveContext } from 'react-responsive';

let container;
beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
});
afterEach(() => {
    document.body.removeChild(container);
    container = null;
});

describe("Header component", () => {
    test("verifica se a renderização foi feita de maneira correta", () => {
        act(() => {
            ReactDOM.render(<Header />, container);
        });

        const headerBlocoTexto = container.getElementsByTagName('a')[0];

        expect(headerBlocoTexto.id).toBe('logo');
        expect(headerBlocoTexto.childNodes[0].tagName).toBe('I');
        expect(headerBlocoTexto.textContent).toMatch(/Aniversariantes/);
    });

    test("verifica a renderização das diferenças das classes do mobile", () => {
        const larguraMobile = 549;
        const larguraDesktop = 550;
        
        act(() => {
            ReactDOM.render(
                <ResponsiveContext.Provider value={{ width: larguraMobile }}>
                    <Header />
                </ResponsiveContext.Provider>
                , container);
        });

        const headerMobile = container.getElementsByTagName('div')[0];
        expect(headerMobile.className).toBe('navbar-fixed');

        act(() => {
            ReactDOM.render(
                <ResponsiveContext.Provider value={{ width: larguraDesktop }}>
                    <Header />
                </ResponsiveContext.Provider>
                , container);
        });

        const headerDesktop = container.getElementsByTagName('div')[0];
        expect(headerDesktop.className).toBe('');
    });
});