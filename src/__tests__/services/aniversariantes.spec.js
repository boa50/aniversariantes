import AniversariantesService from '../../services/aniversariantes';

let container;
beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
});
afterEach(() => {
    document.body.removeChild(container);
    container = null;
});

jest.mock('../../utils/dateUtils.js', () => {
    return {
        getMesAtual: () => 10,
        getDiaAtual: () => 22,
    };
});

jest.mock('../../assets/aniversariantes.js', () => {
    return [
        { pessoa: 'joãozinho', mes: '10', dia: '22' },
        { pessoa: 'pedinho', mes: '10', dia: '25' },
        { pessoa: 'mariazinha', mes: '10', dia: '22' },
        { pessoa: 'testinho', mes: '11', dia: '22' },
    ];
});

describe('Aniversariantes services', () => {
    test('retorna a lista corretamente', () => {
        const aniversariantes = AniversariantesService.ListaAniversariantes();

        expect(aniversariantes.length).toBe(4);
        expect(aniversariantes[0].pessoa).toBe('joãozinho');
        expect(aniversariantes[1].pessoa).toBe('pedinho');
        expect(aniversariantes[2].pessoa).toBe('mariazinha');
        expect(aniversariantes[3].pessoa).toBe('testinho');
    });

    test('retorna a lista do mes', () => {
        const aniversariantes = AniversariantesService.ListaAniversariantesMes(
            10,
        );

        expect(aniversariantes.length).toBe(3);
        expect(aniversariantes[0].pessoa).toBe('joãozinho');
        expect(aniversariantes[1].pessoa).toBe('pedinho');
        expect(aniversariantes[2].pessoa).toBe('mariazinha');
    });

    test('retorna a lista do dia', () => {
        const aniversariantes = AniversariantesService.ListaAniversariantesDia();

        expect(aniversariantes.length).toBe(2);
        expect(aniversariantes[0].pessoa).toBe('joãozinho');
        expect(aniversariantes[1].pessoa).toBe('mariazinha');
    });
});
