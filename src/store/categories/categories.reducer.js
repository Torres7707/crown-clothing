import { CATEGORIES_ACTION_TYPES } from "./categories.types";

export const CATEGORIES_INITIAL_STATE = {
	categories: [],
};

export const categoriesReducer = (state = CATEGORIES_INITIAL_STATE, action) => {
	switch (action.type) {
		case CATEGORIES_ACTION_TYPES.SET_CATEGORIES:
			return {
				...state,
				categories: action.payload,
			};

		default:
			return state;
	}
};
