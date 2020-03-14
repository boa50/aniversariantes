import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import TrocaMes from '../../components/TrocaMes';

let container;
beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
});
afterEach(() => {
    document.body.removeChild(container);
    container = null;
});

jest.mock('../../components/Pagination', () => {
    return () => <ul className='pagination'></ul>;
});

describe("TrocaMes component", () => {
    test("verifica se a renderização foi feita de maneira correta", () => {
        const props = {
            listener: {},
            mes: 10
        }
        act(() => {
            ReactDOM.render(<TrocaMes props={props} />, container);
        });

        const bloco = container.getElementsByTagName('div')[0];
        const pagination = container.getElementsByClassName('pagination')[0];

        expect(bloco.className).toBe('center');
        expect(pagination).toBeDefined();
    });
});