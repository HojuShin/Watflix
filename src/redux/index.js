import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage";
import locker from './store';
import persistStore from "redux-persist/es/persistStore";
import logger from "redux-logger";

const persistConfig = {
    key: "root",
    storage,
}

// 리듀서 통합
const rootReducer = combineReducers({
    locker : locker, 
})

// 리듀서 redux-persist 화 
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}).concat(logger), 
});

export const persistor = persistStore(store)
export default store;
