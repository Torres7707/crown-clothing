import { createContext, useState, useEffect } from "react";

import {
	addCollectionAndDocuments,
	getCategoriesAndDocuments,
} from "../utils/firebase/firebase.utils.jsx";

import { SHOP_DATA } from "../shop-data.js";

export const CategoriesContext = createContext({
	categoriesMap: {},
});

export const CategoriesProvider = ({ children }) => {
	const [categoriesMap, setCategoriesMap] = useState({});

	// this is used to import the categories data to firebase db
	// useEffect(() => {
	// 	addCollectionAndDocuments("categories", SHOP_DATA);
	// }, []);

	useEffect(() => {
		const getCategoriesMap = async () => {
			const categoriesMap = await getCategoriesAndDocuments();

			setCategoriesMap(categoriesMap);
		};
		getCategoriesMap();
	}, []);

	const value = { categoriesMap, setCategoriesMap };
	return (
		<CategoriesContext.Provider value={value}>
			{children}
		</CategoriesContext.Provider>
	);
};
