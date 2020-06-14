import AniversariantesUtils from '../../utils/aniversariantesUtils';

jest.mock('../../utils/dateUtils', () => {
    return {
        getMesAtual: () => 10,
        getDiaAtual: () => 22,
        getMonthNameFromNumber: () => 'Outubro',
        getMes(data: Date): number {
            return data.getMonth() + 1;
        },
        getDia(data: Date): number {
            return data.getDate();
        },
    };
});

const aniversariantesLista = [
    { pessoa: 'mariazinha', nascimento: new Date('2000-10-22T03:00:00Z') },
    { pessoa: 'pedinho', nascimento: new Date('2000-10-25T03:00:00Z') },
    { pessoa: 'joãozinho', nascimento: new Date('2000-10-22T03:00:00Z') },
    { pessoa: 'testinho', nascimento: new Date('2000-11-26T03:00:00Z') },
];

describe('Aniversariantes utils', () => {
    test('retorna a lista do mes', () => {
        const aniversariantes = AniversariantesUtils.getAniversariantesMes(
            aniversariantesLista,
            10,
        );

        expect(aniversariantes.length).toBe(3);
        expect(aniversariantes[0].pessoa).toBe('joãozinho');
        expect(aniversariantes[1].pessoa).toBe('mariazinha');
        expect(aniversariantes[2].pessoa).toBe('pedinho');
    });

    test('retorna a lista do dia', () => {
        const aniversariantes = AniversariantesUtils.getAniversariantesDia(
            aniversariantesLista,
        );

        expect(aniversariantes.length).toBe(2);
        expect(aniversariantes[0].pessoa).toBe('joãozinho');
        expect(aniversariantes[1].pessoa).toBe('mariazinha');
    });

    test('retorna a lista ordenada', () => {
        const aniversariantes = AniversariantesUtils.ordenaPorDiaNome(
            aniversariantesLista,
        ).toArray();

        expect(aniversariantes[0].pessoa).toBe('joãozinho');
        expect(aniversariantes[1].pessoa).toBe('mariazinha');
        expect(aniversariantes[2].pessoa).toBe('pedinho');
    });

    test('retorna a lista para compartilhar', () => {
        const shareTexto = AniversariantesUtils.getAniversariantesShare(
            aniversariantesLista,
            10,
        );

        expect(shareTexto).toContain('Aniversariantes do Mês de Outubro');
        expect(shareTexto).toContain('joãozinho');
        expect(shareTexto).toContain('mariazinha');
        expect(shareTexto).toContain('pedinho');
        expect(shareTexto).toContain('testinho');
    });
});
