import * as actions from '../../../store/actions/pessoaCadastro';
import * as actionsTypes from '../../../store/actions/actionsTypes';
import { Aniversariante } from '../../../models/Aniversariante';

const mockIdFamilia = 'mockIdFamilia';
const mockPessoa = 'mockPessoa';
const mockNascimento = new Date('2000-01-02T03:00:00Z');
const mockError = 'mockError';
const mockAniversariante: Aniversariante = {
    idPessoa: '',
    pessoa: mockPessoa,
    nascimento: mockNascimento,
};

describe('PessoaCadastroAction', () => {
    test('cria a action para initCadastro', () => {
        const expectedAction = {
            type: actionsTypes.INIT_PESSOA_CADASTRO,
            idFamilia: mockIdFamilia,
            aniversariante: mockAniversariante,
        };

        expect(actions.initCadastro(mockIdFamilia, mockAniversariante)).toEqual(
            expectedAction,
        );
    });

    test('cria a action para cadastroStart', () => {
        const expectedAction = {
            type: actionsTypes.PESSOA_CADASTRO_START,
        };

        expect(actions.cadastroStart()).toEqual(expectedAction);
    });

    test('cria a action para cadastroSuccess', () => {
        const expectedAction = {
            type: actionsTypes.PESSOA_CADASTRO_SUCCESS,
            aniversariante: { pessoa: mockPessoa },
        };

        expect(actions.cadastroSuccess({ pessoa: mockPessoa })).toEqual(
            expectedAction,
        );
    });

    test('cria a action para cadastroFail', () => {
        const expectedAction = {
            type: actionsTypes.PESSOA_CADASTRO_FAIL,
            error: mockError,
        };

        expect(actions.cadastroFail(mockError)).toEqual(expectedAction);
    });
});
