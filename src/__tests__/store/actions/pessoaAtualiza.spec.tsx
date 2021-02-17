import * as actions from '../../../store/actions/pessoaAtualiza';
import * as actionTypes from '../../../store/actions/actionsTypes';

const mockIdFamilia = 'AlgumIdFamiliaExtenso';
const mockIdPessoa = 'IdDePessoaBemMockado';
const mockPessoa = 'Algum nome mais diferente dos outros';
const mockNascimento = new Date('1900-01-02T03:00:00Z');
const mockError = 'ASdiauysdASD asuasd aosi';

describe('PessoaAtualizaAction', () => {
    test('cria a action para initAtualiza', () => {
        const expectedAction = {
            type: actionTypes.INIT_PESSOA_ATUALIZA,
            idFamilia: mockIdFamilia,
            idPessoa: mockIdPessoa,
            pessoa: mockPessoa,
            nascimento: mockNascimento,
        };

        expect(
            actions.initAtualiza(
                mockIdFamilia,
                mockIdPessoa,
                mockPessoa,
                mockNascimento,
            ),
        ).toEqual(expectedAction);
    });
    test('cria a action para atualizaStart', () => {
        const expectedAction = {
            type: actionTypes.PESSOA_ATUALIZA_START,
        };

        expect(actions.atualizaStart()).toEqual(expectedAction);
    });
    test('cria a action para atualizaSuccess', () => {
        const expectedAction = {
            type: actionTypes.PESSOA_ATUALIZA_SUCCESS,
            pessoa: mockPessoa,
        };

        expect(actions.atualizaSuccess(mockPessoa)).toEqual(expectedAction);
    });
    test('cria a action para atualizaFail', () => {
        const expectedAction = {
            type: actionTypes.PESSOA_ATUALIZA_FAIL,
            error: mockError,
        };

        expect(actions.atualizaFail(mockError)).toEqual(expectedAction);
    });
});
