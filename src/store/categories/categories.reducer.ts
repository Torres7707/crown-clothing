import { AnyAction } from "redux";
import {
	CategoryAction,
	fetchCategoriesFailure,
	fetchCategoriesStart,
	fetchCategoriesSuccess,
} from "./categories.action";
import { CATEGORIES_ACTION_TYPES, Category } from "./categories.types";

export type CategoriesState = {
	readonly categories: Category[];
	readonly isLoading: boolean;
	readonly error: Error | null;
};

export const CATEGORIES_INITIAL_STATE: CategoriesState = {
	categories: [],
	isLoading: false,
	error: null,
};

export const categoriesReducer = (
	state = CATEGORIES_INITIAL_STATE,
	action = {} as AnyAction
): CategoriesState => {
	if (fetchCategoriesStart.match(action)) {
		return {
			...state,
			isLoading: true,
		};
	}
	if (fetchCategoriesSuccess.match(action)) {
		return {
			...state,
			categories: action.payload,
			isLoading: false,
		};
	}
	if (fetchCategoriesFailure.match(action)) {
		return {
			...state,
			isLoading: false,
			error: action.payload,
		};
	}

	return state;
	// switch (action.type) {
	// 	case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START:
	// 		return {
	// 			...state,
	// 			isLoading: true,
	// 		};
	// 	case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS:
	// 		return {
	// 			...state,
	// 			categories: action.payload,
	// 			isLoading: false,
	// 			error: null,
	// 		};
	// 	case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILURE:
	// 		return {
	// 			...state,
	// 			isLoading: false,
	// 			error: action.payload,
	// 		};
	// 	default:
	// 		return state;
	// }
};
