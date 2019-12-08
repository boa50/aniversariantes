import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import Pagination from '../components/Pagination';
import { Context as ResponsiveContext } from 'react-responsive';

let container;
let props;
const larguraMobile = 549;
const larguraDesktop = 550;

let elementosClicaveis;
let setaEsquerda;
let setaDireita;

beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);

    props = {
        listener: function(page) {props.page = page},
        page: 5,
        lastPage: 10
    }
});
afterEach(() => {
    document.body.removeChild(container);
    container = null;
});

const renderizar = (largura=larguraDesktop, inicializar=false) => {
    act(() => {
        ReactDOM.render(
            <ResponsiveContext.Provider value={{ width: largura }}>
                <Pagination 
                    listener={props.listener}
                    page={props.page}
                    lastPage={props.lastPage} />
            </ResponsiveContext.Provider>
            , container);
    });

    if (inicializar) {
        elementosClicaveis = container.getElementsByTagName('li');
        setaEsquerda = elementosClicaveis[0];
        setaDireita = elementosClicaveis[elementosClicaveis.length - 1];
    }
}

const checaPaginaAtiva = pagina => {
    expect(pagina.className).toMatch('active');
}

describe("Pagination component", () => {
    test("verifica a renderização do está correta", () => {
        renderizar(larguraMobile, true);

        const paginas = container.getElementsByTagName('ul')[0];
        const paginaSelecionada = elementosClicaveis[props.page];
        const paginaSelecionadaEsquerda = elementosClicaveis[props.page - 1];
        const paginaSelecionadaDireita = elementosClicaveis[props.page + 1];

        expect(paginas.className).toBe('pagination');
        expect(setaEsquerda.textContent).toBe('chevron_left');
        expect(setaDireita.textContent).toBe('chevron_right');
        expect(setaEsquerda.className).toBe('waves-effect');
        expect(setaDireita.className).toBe('waves-effect');
        expect(elementosClicaveis.length).toBe(12);
        expect(paginaSelecionada.className).toMatch('active');
        expect(paginaSelecionadaEsquerda.textContent).toBe('...');
        expect(paginaSelecionadaDireita.textContent).toBe('...');
        expect(paginaSelecionadaEsquerda.className).toBe('');
        expect(paginaSelecionadaDireita.className).toBe('');

        renderizar();

        expect(paginas.className).toBe('pagination');
        expect(setaEsquerda.textContent).toBe('chevron_left');
        expect(setaDireita.textContent).toBe('chevron_right');
        expect(setaEsquerda.className).toBe('waves-effect');
        expect(setaDireita.className).toBe('waves-effect');
        expect(elementosClicaveis.length).toBe(12);
        checaPaginaAtiva(paginaSelecionada);

        for (let i = 1; i<=props.lastPage; i++) {
            expect(elementosClicaveis[i].textContent).toBe((i).toString());
            if (i !== props.page) {
                expect(elementosClicaveis[i].className).toBe('waves-effect');
            }
        }
    });

    test("verifica a troca de página ativa", () => {
        renderizar(larguraDesktop, true);
        
        let numeroPaginaAntiga = props.page;
        setaEsquerda.click();
        let numeroPaginaNova = props.page;

        renderizar();

        let antigaPaginaSelecionada = elementosClicaveis[numeroPaginaAntiga];
        let novaPaginaSelecionada = elementosClicaveis[numeroPaginaNova];
        
        expect(antigaPaginaSelecionada.className).toBe('waves-effect');
        checaPaginaAtiva(novaPaginaSelecionada);

        numeroPaginaAntiga = props.page;
        setaDireita.click();
        setaDireita.click();
        numeroPaginaNova = props.page;

        renderizar();

        antigaPaginaSelecionada = elementosClicaveis[numeroPaginaAntiga];
        novaPaginaSelecionada = elementosClicaveis[numeroPaginaNova];
        
        expect(antigaPaginaSelecionada.className).toBe('waves-effect');
        checaPaginaAtiva(novaPaginaSelecionada);
    });

    test("altera para página específica", () => {
        renderizar(larguraDesktop, true);

        let novaPagina;
        do {
            novaPagina = Math.floor(Math.random() * props.lastPage) + 1;
        } while (novaPagina == props.page);

        const numeroPaginaAntiga = props.page;
        const paginaFutura = elementosClicaveis[novaPagina];

        paginaFutura.click();
        renderizar();

        const paginaAntiga = elementosClicaveis[numeroPaginaAntiga];
        
        expect(paginaAntiga.className).toBe('waves-effect');
        checaPaginaAtiva(paginaFutura);
    });

    test("verifica limite inferior", () => {
        props.page = 1;
        renderizar(larguraDesktop, true);

        const pagina = elementosClicaveis[props.page];

        setaEsquerda.click();
        renderizar();

        checaPaginaAtiva(pagina);
        expect(setaEsquerda.className).toBe("disabled");
    });

    test("verifica limite superior", () => {
        props.page = props.lastPage;
        renderizar(larguraDesktop, true);

        const pagina = elementosClicaveis[props.page];

        setaDireita.click();
        renderizar();

        checaPaginaAtiva(pagina);
        expect(setaDireita.className).toBe("disabled");
    });
});