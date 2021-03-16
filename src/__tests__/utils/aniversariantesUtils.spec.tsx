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
    {
        idPessoa: 'pessoa01',
        pessoa: 'mariazinha',
        nascimento: new Date('2000-10-22T03:00:00Z'),
        idPai: '',
        idMae: '',
    },
    {
        idPessoa: 'pessoa02',
        pessoa: 'pedinho',
        nascimento: new Date('2000-10-25T03:00:00Z'),
        idPai: 'pessoa03',
        idMae: 'pessoa01',
    },
    {
        idPessoa: 'pessoa03',
        pessoa: 'joãozinho',
        nascimento: new Date('2000-10-22T03:00:00Z'),
        idPai: '',
        idMae: '',
    },
    {
        idPessoa: 'pessoa04',
        pessoa: 'testinho',
        nascimento: new Date('2020-11-26T03:00:00Z'),
        idPai: '',
        idMae: '',
    },
    {
        idPessoa: 'pessoa05',
        pessoa: 'testinho',
        nascimento: new Date('2000-11-26T03:00:00Z'),
        idPai: '',
        idMae: '',
    },
    {
        idPessoa: 'pessoa06',
        pessoa: 'testinho',
        nascimento: new Date('2010-11-26T03:00:00Z'),
        idPai: '',
        idMae: '',
    },
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

    test('retorna a lista ordenada por dia e nome', () => {
        const aniversariantes = AniversariantesUtils.ordenaPorDiaNome(
            aniversariantesLista,
        ).toArray();

        expect(aniversariantes[0].pessoa).toBe('joãozinho');
        expect(aniversariantes[1].pessoa).toBe('mariazinha');
        expect(aniversariantes[2].pessoa).toBe('pedinho');
    });

    test('retorna a lista ordenada por nome e nascimento', () => {
        const aniversariantes = AniversariantesUtils.ordenaPorNomeNascimento(
            aniversariantesLista,
        ).toArray();

        expect(aniversariantes[0].pessoa).toBe('joãozinho');
        expect(aniversariantes[1].pessoa).toBe('mariazinha');
        expect(aniversariantes[2].pessoa).toBe('pedinho');
        expect(aniversariantes[3].idPessoa).toBe('pessoa05');
        expect(aniversariantes[4].idPessoa).toBe('pessoa06');
        expect(aniversariantes[5].idPessoa).toBe('pessoa04');
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

    test('retorna o aniversariante pelo id', () => {
        const aniversariante = AniversariantesUtils.getAniversariantePorId(
            aniversariantesLista,
            'pessoa02',
        );

        expect(aniversariante.pessoa).toBe('pedinho');
        expect(aniversariante.nascimento).toStrictEqual(
            new Date('2000-10-25T03:00:00Z'),
        );
        expect(aniversariante.idPai).toBe('pessoa03');
        expect(aniversariante.idMae).toBe('pessoa01');
    });
});
