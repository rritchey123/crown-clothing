import { compose, createStore, applyMiddleware } from "redux";
import logger from "redux-logger"
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import createSagaMiddleware from 'redux-saga'
import { rootReducer } from "./root-reducer";

import { rootSaga } from "./root-saga";


const sagaMiddleware = createSagaMiddleware()

const middleware = [logger, sagaMiddleware]

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart']
}


const persistedReducer = persistReducer(persistConfig, rootReducer)

const composedEnhancers = compose(applyMiddleware(...middleware))

export const store = createStore(persistedReducer, undefined, composedEnhancers)

sagaMiddleware.run(rootSaga)

export const persistor = persistStore(store)