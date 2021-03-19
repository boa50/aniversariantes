import DbUtils from '../../utils/dbUtils';
import { PessoaCadastroAction } from '../../models/PessoaCadastroAction';

const idMock = 'algumIdMockado';
const idFamiliaMock = 'algumIdParaAFamilia';
const nomeMock = 'nomeMockado';
const nascimentoMock = new Date('2000-01-02T03:00:00Z');
const idPaiMock = 'algumIdParaOPai';
const idMaeMock = 'OIdParaAOkaasan';
const referenciaMock = 'referenciaBemMockada';
const referenciaIdMock = 'asdasd/adasd/' + referenciaMock;
const databaseMock = 'algodiferente';
const baseURLMock = 'http://www.teste.com/algumacoisa/' + databaseMock + '/';

const document = {
    name: 'asdasd/asdasd/asdd/' + idMock,
    fields: {
        pessoa: {
            stringValue: nomeMock,
        },
        nascimento: {
            timestampValue: nascimentoMock,
        },
        campo: {
            referenceValue: referenciaMock,
        },
        mae: {
            referenceValue: referenciaIdMock,
        },
    },
};

const action = {
    idFamilia: idFamiliaMock,
    aniversariante: {
        pessoa: nomeMock,
        nascimento: nascimentoMock,
        idPai: idPaiMock,
        idMae: idMaeMock,
    },
} as PessoaCadastroAction;

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

        expect(nascimento).toStrictEqual(nascimentoMock);
    });
    test('retorna o campo com valor de referência', () => {
        const referencia = DbUtils.getDocumentField(
            document,
            'campo',
            'reference',
        );

        expect(referencia).toBe(referenciaMock);
    });
    test('retorna o id de um dos pais', () => {
        const id = DbUtils.getIdPais(document, 'mae');

        expect(id).toBe(referenciaMock);
    });
    test('retorna o campo de referencia montado', () => {
        const referencia = DbUtils.mountReferenceField(
            baseURLMock,
            idFamiliaMock,
            idMock,
        );

        expect(referencia).toBe(
            `${databaseMock}/${idFamiliaMock}/aniversariantes/${idMock}`,
        );
    });
    test('retorna o campo de referencia montado com url vazia', () => {
        const referencia = DbUtils.mountReferenceField(
            undefined,
            idFamiliaMock,
            idMock,
        );

        expect(referencia).toBe(`${idFamiliaMock}/aniversariantes/${idMock}`);
    });
    test('retorna o payload montado', () => {
        const payload = DbUtils.mountPayload(baseURLMock, action);

        expect(payload).toStrictEqual({
            fields: {
                pessoa: {
                    stringValue: 'nomeMockado',
                },
                nascimento: {
                    timestampValue: new Date('2000-01-02T03:00:00.000Z'),
                },
                pai: {
                    referenceValue: `${databaseMock}/${idFamiliaMock}/aniversariantes/${idPaiMock}`,
                },
                mae: {
                    referenceValue: `${databaseMock}/${idFamiliaMock}/aniversariantes/${idMaeMock}`,
                },
            },
        });
    });
    test('retorna o payload montado sem pais', () => {
        const act = {
            ...action,
            aniversariante: {
                ...action.aniversariante,
                idPai: '',
                idMae: '',
            },
        };

        const payload = DbUtils.mountPayload(baseURLMock, act);

        expect(payload).toStrictEqual({
            fields: {
                pessoa: {
                    stringValue: 'nomeMockado',
                },
                nascimento: {
                    timestampValue: new Date('2000-01-02T03:00:00.000Z'),
                },
            },
        });
    });
});
