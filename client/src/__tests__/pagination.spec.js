import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import Pagination from '../components/Pagination';
import { Context as ResponsiveContext } from 'react-responsive';

let container;
let props;
const larguraMobile = 549;
const larguraDesktop = 550;

beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);

    props = {
        listener: {},
        page: 5,
        lastPage: 10
    }
});
afterEach(() => {
    document.body.removeChild(container);
    container = null;
});

describe("Pagination component", () => {
    test("verifica a renderização do está correta", () => {
        act(() => {
            ReactDOM.render(
                <ResponsiveContext.Provider value={{ width: larguraMobile }}>
                    <Pagination page={props.page}
                        lastPage={props.lastPage} />
                </ResponsiveContext.Provider>
                , container);
        });

        const paginas = container.getElementsByTagName('ul')[0];
        const paginasElementos = container.getElementsByTagName('li');
        const setaEsquerda = paginasElementos[0];
        const setaDireita = paginasElementos[paginasElementos.length - 1];
        const paginaSelecionada = paginasElementos[props.page];
        const paginaSelecionadaEsquerda = paginasElementos[props.page - 1];
        const paginaSelecionadaDireita = paginasElementos[props.page + 1];

        expect(paginas.className).toBe('pagination');
        expect(setaEsquerda.textContent).toBe('chevron_left');
        expect(setaDireita.textContent).toBe('chevron_right');
        expect(setaEsquerda.className).toBe('waves-effect');
        expect(setaDireita.className).toBe('waves-effect');
        expect(paginasElementos.length).toBe(12);
        expect(paginaSelecionada.className).toMatch('active');
        expect(paginaSelecionadaEsquerda.textContent).toBe('...');
        expect(paginaSelecionadaDireita.textContent).toBe('...');
        expect(paginaSelecionadaEsquerda.className).toBe('');
        expect(paginaSelecionadaDireita.className).toBe('');

        act(() => {
            ReactDOM.render(
                <ResponsiveContext.Provider value={{ width: larguraDesktop }}>
                    <Pagination page={props.page}
                        lastPage={props.lastPage} />
                </ResponsiveContext.Provider>
                , container);
        });

        expect(paginas.className).toBe('pagination');
        expect(setaEsquerda.textContent).toBe('chevron_left');
        expect(setaDireita.textContent).toBe('chevron_right');
        expect(setaEsquerda.className).toBe('waves-effect');
        expect(setaDireita.className).toBe('waves-effect');
        expect(paginasElementos.length).toBe(12);
        expect(paginaSelecionada.className).toMatch('active');

        for (let i = 1; i<=props.lastPage; i++) {
            expect(paginasElementos[i].textContent).toBe((i).toString());
            if (i !== props.page) {
                expect(paginasElementos[i].className).toBe('waves-effect');
            }
        }
    });

    test("verifica a troca de página ativa", () => {
        props.listener = function(page) {props.page = page};
        act(() => {
            ReactDOM.render(
                <ResponsiveContext.Provider value={{ width: larguraDesktop }}>
                    <Pagination listener={props.listener}
                        page={props.page}
                        lastPage={props.lastPage} />
                </ResponsiveContext.Provider>
                , container);
        });

        const paginasElementos = container.getElementsByTagName('li');
        const setaEsquerda = paginasElementos[0];
        const setaDireita = paginasElementos[paginasElementos.length - 1];
        
        let numeroPaginaAntiga = props.page;
        setaEsquerda.click();
        let numeroPaginaNova = props.page;

        act(() => {
            ReactDOM.render(
                <ResponsiveContext.Provider value={{ width: larguraDesktop }}>
                    <Pagination listener={props.listener}
                        page={props.page}
                        lastPage={props.lastPage} />
                </ResponsiveContext.Provider>
                , container);
        });

        let antigaPaginaSelecionada = paginasElementos[numeroPaginaAntiga];
        let novaPaginaSelecionada = paginasElementos[numeroPaginaNova];
        
        expect(antigaPaginaSelecionada.className).toBe('waves-effect');
        expect(novaPaginaSelecionada.className).toMatch('active');

        numeroPaginaAntiga = props.page;
        setaDireita.click();
        setaDireita.click();
        numeroPaginaNova = props.page;

        act(() => {
            ReactDOM.render(
                <ResponsiveContext.Provider value={{ width: larguraDesktop }}>
                    <Pagination listener={props.listener}
                        page={props.page}
                        lastPage={props.lastPage} />
                </ResponsiveContext.Provider>
                , container);
        });

        antigaPaginaSelecionada = paginasElementos[numeroPaginaAntiga];
        novaPaginaSelecionada = paginasElementos[numeroPaginaNova];
        
        expect(antigaPaginaSelecionada.className).toBe('waves-effect');
        expect(novaPaginaSelecionada.className).toMatch('active');
    });
});