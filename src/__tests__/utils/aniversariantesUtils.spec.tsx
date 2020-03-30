import AniversariantesUtils from '../../utils/aniversariantesUtils';

jest.mock('../../utils/dateUtils', () => {
    return {
        getMesAtual: () => 10,
        getDiaAtual: () => 22,
    };
});

const aniversariantesLista = [
    { pessoa: 'joãozinho', mes: '10', dia: '22' },
    { pessoa: 'pedinho', mes: '10', dia: '25' },
    { pessoa: 'mariazinha', mes: '10', dia: '22' },
    { pessoa: 'testinho', mes: '11', dia: '22' },
];

describe('Aniversariantes utils', () => {
    test('retorna a lista do mes', () => {
        const aniversariantes = AniversariantesUtils.getAniversariantesMes(
            aniversariantesLista,
            10,
        );

        expect(aniversariantes.length).toBe(3);
        expect(aniversariantes[0].pessoa).toBe('joãozinho');
        expect(aniversariantes[1].pessoa).toBe('pedinho');
        expect(aniversariantes[2].pessoa).toBe('mariazinha');
    });

    test('retorna a lista do dia', () => {
        const aniversariantes = AniversariantesUtils.getAniversariantesDia(
            aniversariantesLista,
        );

        expect(aniversariantes.length).toBe(2);
        expect(aniversariantes[0].pessoa).toBe('joãozinho');
        expect(aniversariantes[1].pessoa).toBe('mariazinha');
    });
});
