import * as actionTypes from './actionsTypes';

export const initProperties = (isMobile: boolean) => {
    return {
        type: actionTypes.INIT_PROPERTIES,
        isMobile,
    };
};
