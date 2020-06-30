import * as actions from '../../../store/actions/pessoaCadastro';
import * as actionsTypes from '../../../store/actions/actionsTypes';

const mockIdFamilia = 'mockIdFamilia';
const mockPessoa = 'mockPessoa';
const mockNascimento = new Date('2000-01-02T03:00:00Z');
const mockError = 'mockError';

describe('PessoaCadastroAction', () => {
    test('cria a action para initCadastro', () => {
        const expectedAction = {
            type: actionsTypes.INIT_PESSOA_CADASTRO,
            idFamilia: mockIdFamilia,
            pessoa: mockPessoa,
            nascimento: mockNascimento,
        };

        expect(
            actions.initCadastro(mockIdFamilia, mockPessoa, mockNascimento),
        ).toEqual(expectedAction);
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
            pessoa: mockPessoa,
        };

        expect(actions.cadastroSuccess(mockPessoa)).toEqual(expectedAction);
    });

    test('cria a action para cadastroFail', () => {
        const expectedAction = {
            type: actionsTypes.PESSOA_CADASTRO_FAIL,
            error: mockError,
        };

        expect(actions.cadastroFail(mockError)).toEqual(expectedAction);
    });
});
