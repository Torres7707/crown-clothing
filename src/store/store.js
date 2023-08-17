import {
	compose,
	legacy_createStore as createStore,
	applyMiddleware,
} from "redux";
import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { rootReducer } from "./root-reducer";

const loggerMiddleware = (store) => (next) => (action) => {
	if (!action.type) {
		return next(action);
	}
	console.log("type:", action.type);
	console.log("payload:", action.payload);
	console.log("currentState:", store.getState());
	// update reducer
	next(action);
	console.log("nextState:", store.getState());
};

const persistConfig = {
	key: "root",
	storage,
	blacklist: ["user"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middlewares = [logger, loggerMiddleware];

const composeEnhancers = compose(applyMiddleware(...middlewares));

export const store = createStore(persistedReducer, undefined, composeEnhancers);

export const persistor = persistStore(store);
// export const store = configureStore({
// 	reducer: rootReducer,
// 	// middleware: [logger],
// 	// devTools: process.env.NODE_ENV !== "production",
// 	composeEnhancers,
// });
