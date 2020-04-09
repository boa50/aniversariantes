import * as actions from '../../../store/actions/aniversariantes';
import * as actionsTypes from '../../../store/actions/actionsTypes';

describe('AniversariantesActions', () => {
    it('cria a action para initAniversariantes', () => {
        const expectedAction = {
            type: actionsTypes.INIT_ANIVERSARIANTES,
        };

        expect(actions.initAniversariantes()).toEqual(expectedAction);
    });

    it('cria a action para setAniversariantes', () => {
        const expectedAction = {
            type: actionsTypes.SET_ANIVERSARIANTES,
            aniversariantes: [{ pessoa: 'joãozinho', mes: '10', dia: '22' }],
        };

        expect(
            actions.setAniversariantes([
                { pessoa: 'joãozinho', mes: '10', dia: '22' },
            ]),
        ).toEqual(expectedAction);
    });

    it('cria a action para setAniversariantesMes', () => {
        const expectedAction = {
            type: actionsTypes.SET_ANIVERSARIANTES_MES,
        };

        expect(actions.setAniversariantesMes()).toEqual(expectedAction);
    });

    it('cria a action para setAniversariantesDia', () => {
        const expectedAction = {
            type: actionsTypes.SET_ANIVERSARIANTES_DIA,
        };

        expect(actions.setAniversariantesDia()).toEqual(expectedAction);
    });

    it('cria a action para setMesInfo', () => {
        const expectedAction = {
            type: actionsTypes.SET_MES_INFO,
            mes: 10,
        };

        expect(actions.setMesInfo(10)).toEqual(expectedAction);
    });
});
