import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';

import aniversariantesReducer from './reducers/aniversariantes';
import authReducer from './reducers/auth';
import { watch } from './sagas';

const rootReducer = combineReducers({
    aniversariantes: aniversariantesReducer,
    auth: authReducer,
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(watch);

export default ({ element }: any) => (
    <Provider store={store}>{element}</Provider>
);
