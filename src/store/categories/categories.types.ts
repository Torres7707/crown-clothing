export enum CATEGORIES_ACTION_TYPES {
	// SET_CATEGORIES: "categories/SET_CATEGORIES",
	FETCH_CATEGORIES_START = "categories/FETCH_CATEGORIES_START",
	FETCH_CATEGORIES_SUCCESS = "categories/FETCH_CATEGORIES_SUCCESS",
	FETCH_CATEGORIES_FAILURE = "categories/FETCH_CATEGORIES_FAILURE",
}

export type CategoryItem = {
	id: number;
	name: string;
	imageUrl: string;
	price: number;
};

export type Category = {
	title: string;
	imageUrl: string;
	items: CategoryItem[];
};

export type CategoryMap = {
	[key: string]: CategoryItem[];
};
