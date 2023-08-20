import { CATEGORIES_ACTION_TYPES } from "./categories.types";

export const CATEGORIES_INITIAL_STATE = {
	categories: [],
	isLoading: false,
	error: null,
};

export const categoriesReducer = (state = CATEGORIES_INITIAL_STATE, action) => {
	switch (action.type) {
		// case CATEGORIES_ACTION_TYPES.SET_CATEGORIES:
		// 	return {
		// 		...state,
		// 		categories: action.payload,
		// 	};
		case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START:
			return {
				...state,
				isLoading: true,
			};
		case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS:
			return {
				...state,
				categories: action.payload,
				isLoading: false,
				error: null,
			};
		case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILURE:
			return {
				...state,
				isLoading: false,
				error: action.payload,
			};
		default:
			return state;
	}
};
