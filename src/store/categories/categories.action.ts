import { CATEGORIES_ACTION_TYPES, Category } from "./categories.types";
import {
	Action,
	ActionWithPayload,
	createAction,
} from "../../utils/reducer/reducer.utils";
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";

export type FetchCategoriesStart =
	Action<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START>;
export type FetchCategoriesSuccess = ActionWithPayload<
	CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS,
	Category[]
>;
export type FetchCategoriesFailure = ActionWithPayload<
	CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILURE,
	Error
>;

export type CategoryAction =
	| FetchCategoriesStart
	| FetchCategoriesSuccess
	| FetchCategoriesFailure;

// export const setCategories = (categoriesArray) =>
// 	createAction(CATEGORIES_ACTION_TYPES.SET_CATEGORIES, categoriesArray);

export const fetchCategoriesStart = (): FetchCategoriesStart =>
	createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START);

export const fetchCategoriesSuccess = (
	categoriesArray: Category[]
): FetchCategoriesSuccess =>
	createAction(
		CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS,
		categoriesArray
	);

export const fetchCategoriesFailure = (error: Error): FetchCategoriesFailure =>
	createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILURE, error);

// export const fetchCategoriesStartAsync = () => {
// 	return async (dispatch) => {
// 		dispatch(fetchCategoriesStart());
// 		try {
// 			const categoriesArray = await getCategoriesAndDocuments();
// 			dispatch(fetchCategoriesSuccess(categoriesArray));
// 		} catch (error) {
// 			dispatch(fetchCategoriesFailure(error.message));
// 		}
// 	};
// };
