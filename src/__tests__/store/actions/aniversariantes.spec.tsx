import * as actions from '../../../store/actions/aniversariantes';
import * as actionsTypes from '../../../store/actions/actionsTypes';

describe('AniversariantesActions', () => {
    it('cria a action para initAniversariantes', () => {
        const mockIdFamilia = 'mockIdFamilia';
        const expectedAction = {
            type: actionsTypes.INIT_ANIVERSARIANTES,
            idFamilia: mockIdFamilia,
        };

        expect(actions.initAniversariantes(mockIdFamilia)).toEqual(
            expectedAction,
        );
    });

    it('cria a action para setMesInfo', () => {
        const mockMes = 10;
        const expectedAction = {
            type: actionsTypes.SET_MES_INFO,
            mes: mockMes,
        };

        expect(actions.setMesInfo(mockMes)).toEqual(expectedAction);
    });
});
