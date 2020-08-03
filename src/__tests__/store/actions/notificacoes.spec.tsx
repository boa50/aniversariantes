import * as actions from '../../../store/actions/notificacoes';
import * as actionsTypes from '../../../store/actions/actionsTypes';

describe('AniversariantesActions', () => {
    test('cria a action para initAniversariantes', () => {
        const mockIdFamilia = 'mockIdFamilia';
        const mockTokenDestino = 'mockTokenDestino';
        const expectedAction = {
            type: actionsTypes.NOTIFICACOES_SUBSCREVE,
            idFamilia: mockIdFamilia,
            tokenDestino: mockTokenDestino,
        };

        expect(actions.subscreve(mockIdFamilia, mockTokenDestino)).toEqual(
            expectedAction,
        );
    });
});
