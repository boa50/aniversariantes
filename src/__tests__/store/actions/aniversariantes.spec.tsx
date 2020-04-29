import * as actions from '../../../store/actions/aniversariantes';
import * as actionsTypes from '../../../store/actions/actionsTypes';
import { Aniversariante } from '../../../models/Aniversariante';

describe('AniversariantesActions', () => {
    test('cria a action para initAniversariantes', () => {
        const mockIdFamilia = 'mockIdFamilia';
        const expectedAction = {
            type: actionsTypes.INIT_ANIVERSARIANTES,
            idFamilia: mockIdFamilia,
        };

        expect(actions.initAniversariantes(mockIdFamilia)).toEqual(
            expectedAction,
        );
    });

    test('cria a action para setMesInfo', () => {
        const mockMes = 10;
        const expectedAction = {
            type: actionsTypes.SET_MES_INFO,
            mes: mockMes,
        };

        expect(actions.setMesInfo(mockMes)).toEqual(expectedAction);
    });

    test('cria a action para fetchAniversariantesStart', () => {
        const expectedAction = {
            type: actionsTypes.FETCH_ANIVERSARIANTES_START,
        };

        expect(actions.fetchAniversariantesStart()).toEqual(expectedAction);
    });

    test('cria a action para fetchAniversariantesSuccess', () => {
        const aniversariantes: Aniversariante[] = [
            {
                pessoa: 'jumentinho',
                dia: '10',
                mes: '8',
            },
        ];
        const expectedAction = {
            type: actionsTypes.FETCH_ANIVERSARIANTES_SUCCESS,
            aniversariantes: aniversariantes,
        };

        expect(actions.fetchAniversariantesSuccess(aniversariantes)).toEqual(
            expectedAction,
        );
    });

    test('cria a action para fetchAniversariantesFail', () => {
        const error = 'erro do jumento branco';
        const expectedAction = {
            type: actionsTypes.FETCH_ANIVERSARIANTES_FAIL,
            error: error,
        };

        expect(actions.fetchAniversariantesFail(error)).toEqual(expectedAction);
    });
});
