import DbUtils from '../../utils/dbUtils';

const idMock = 'algumIdMockado';
const nomeMock = 'nomeMockado';
const nascimentoMock = new Date('2000-01-02T03:00:00Z');

const document = {
    name: 'asdasd/asdasd/asdd/' + idMock,
    fields: {
        pessoa: {
            stringValue: nomeMock,
        },
        nascimento: {
            timestampValue: nascimentoMock,
        },
    },
};

describe('Db utils', () => {
    test('retorna o id do documento', () => {
        const id = DbUtils.getDocumentId(document);

        expect(id).toBe(idMock);
    });
    test('retorna o nome do aniversariante', () => {
        const nome = DbUtils.getAniversarianteNome(document);

        expect(nome).toBe(nomeMock);
    });
    test('retorna o nascimento do aniversariante', () => {
        const nascimento = DbUtils.getAniversarianteNascimento(document);

        expect(nascimento).toBe(nascimento);
    });
});
