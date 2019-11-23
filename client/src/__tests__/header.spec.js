import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import Header from '../components/Header'

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
        const mediaQueries = {
            isBigScreen: false,
        };

        act(() => {
            ReactDOM.render(<Header mediaQueries={mediaQueries} />, container);
        });
        const header = container.getElementsByTagName('a')[0];

        expect(header.id).toBe('logo');
        expect(header.childNodes[0].tagName).toBe('I');
        expect(header.textContent).toMatch(/Aniversariantes/);
    });
});