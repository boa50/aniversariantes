import * as actions from '../../../store/actions/properties';
import * as actionsTypes from '../../../store/actions/actionsTypes';

describe('PropertiesActions', () => {
    test('cria a action para initProperties', () => {
        const mockIsMobile = true;
        const expectedAction = {
            type: actionsTypes.INIT_PROPERTIES,
            isMobile: mockIsMobile,
        };

        expect(actions.initProperties(mockIsMobile)).toEqual(expectedAction);
    });
});
