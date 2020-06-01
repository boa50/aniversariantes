import reducer from '../../../store/reducers/properties';
import * as actionTypes from '../../../store/actions/actionsTypes';
import { PropertiesAction } from '../../../models/PropertiesAction';
import { PropertiesStateReducer } from '../../../models/PropertiesState';

const initState: PropertiesStateReducer = {
    isMobile: false,
};

const defaultAction: PropertiesAction = {
    type: '',
    isMobile: false,
};

describe('PropertiesReducer', () => {
    test('verifica o correto estado inicial', () => {
        const action: PropertiesAction = {
            ...defaultAction,
        };
        expect(reducer(undefined, action)).toEqual({
            ...initState,
        });
    });

    test('verifica o INIT_PROPERTIES', () => {
        const newState: PropertiesStateReducer = {
            ...initState,
            isMobile: false,
        };

        const action: PropertiesAction = {
            ...defaultAction,
            type: actionTypes.INIT_PROPERTIES,
            isMobile: true,
        };

        expect(reducer(newState, action)).toEqual({
            ...initState,
            isMobile: true,
        });
    });
});
