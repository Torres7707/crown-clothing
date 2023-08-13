import {
	compose,
	legacy_createStore as createStore,
	applyMiddleware,
} from "redux";
import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";

import { rootReducer } from "./root-reducer";

const middlewares = [logger];

const composeEnhancers = compose(applyMiddleware(...middlewares));

export const store = createStore(rootReducer, undefined, composeEnhancers);

// export const store = configureStore({
// 	reducer: rootReducer,
// 	// middleware: [logger],
// 	// devTools: process.env.NODE_ENV !== "production",
// 	composeEnhancers,
// });
