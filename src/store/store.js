import { compose, createStore, applyMiddleware } from "redux";
import logger from "redux-logger"
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { thunk } from "redux-thunk";

import { rootReducer } from "./root-reducer";

const middleware = [logger, thunk]

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const composedEnhancers = compose(applyMiddleware(...middleware))

export const store = createStore(persistedReducer, undefined, composedEnhancers)

export const persistor = persistStore(store)