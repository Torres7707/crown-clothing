import {
	compose,
	legacy_createStore as createStore,
	applyMiddleware,
	Middleware,
} from "redux";
import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import { persistStore, persistReducer, PersistConfig } from "redux-persist";
import storage from "redux-persist/lib/storage";
// import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";

import { rootSaga } from "./root-saga";

import { rootReducer } from "./root-reducer";

export type RootState = ReturnType<typeof rootReducer>;

declare global {
	interface Window {
		__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
	}
}

type ExtendedPersistConfig = PersistConfig<RootState> & {
	blacklist?: Array<keyof RootState>;
	whiteList?: Array<keyof RootState>;
	// blacklist: ["user"],
};

const persistConfig: ExtendedPersistConfig = {
	key: "root",
	storage,
	whitelist: ["cart"],
	// blacklist: ["user"],
};

export const sagaMiddleware = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middlewares = [
	process.env.NODE_ENV !== "production" && logger,
	// thunk,
	sagaMiddleware,
].filter((middleware): middleware is Middleware => Boolean(middleware));

// use redux devtools in development
const composeEnhancer =
	(process.env.NODE_ENV !== "production" &&
		window &&
		window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
	compose;

const composeEnhancers = composeEnhancer(applyMiddleware(...middlewares));

export const store = createStore(persistedReducer, undefined, composeEnhancers);

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
// export const store = configureStore({
// 	reducer: rootReducer,
// 	// middleware: [logger],
// 	// devTools: process.env.NODE_ENV !== "production",
// 	composeEnhancers,
// });
