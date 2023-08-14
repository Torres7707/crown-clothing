import {
	compose,
	legacy_createStore as createStore,
	applyMiddleware,
} from "redux";
import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";

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

const middlewares = [logger, loggerMiddleware];

const composeEnhancers = compose(applyMiddleware(...middlewares));

export const store = createStore(rootReducer, undefined, composeEnhancers);

// export const store = configureStore({
// 	reducer: rootReducer,
// 	// middleware: [logger],
// 	// devTools: process.env.NODE_ENV !== "production",
// 	composeEnhancers,
// });
