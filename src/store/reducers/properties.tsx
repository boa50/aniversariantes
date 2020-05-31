import * as actionTypes from '../actions/actionsTypes';
import { PropertiesAction } from '../../models/PropertiesAction';
import { PropertiesStateReducer } from '../../models/PropertiesState';

const initState: PropertiesStateReducer = {
    isMobile: false,
};

const initProperties = (
    state: PropertiesStateReducer,
    action: PropertiesAction,
) => {
    return {
        ...state,
        isMobile: action.isMobile,
    };
};

const reducer = (state = initState, action: PropertiesAction) => {
    switch (action.type) {
        case actionTypes.INIT_PROPERTIES:
            return initProperties(state, action);
        default:
            return state;
    }
};

export default reducer;
