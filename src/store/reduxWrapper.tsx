import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import aniversariantesReducer from './reducers/aniversariantes';
import authReducer from './reducers/auth';
import { watch } from './sagas';

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const isBrowser = typeof window !== 'undefined';

const composeEnhancers =
    (isBrowser && process.env.NODE_ENV === 'development'
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        : null) || compose;

const rootReducer = combineReducers({
    aniversariantes: aniversariantesReducer,
    auth: authReducer,
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(sagaMiddleware)),
);

sagaMiddleware.run(watch);

export default ({ element }: any) => (
    <Provider store={store}>{element}</Provider>
);
