import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";

import CategoriesPreview from "../categories-preview/categories-preview.component";
import Category from "../category/category.component";
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";
import {
	setCategories,
	fetchCategoriesStartAsync,
} from "../../store/categories/categories.action";

const Shop = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		const getCategoriesMap = async () => {
			// const categoriesArray = await getCategoriesAndDocuments();
			// dispatch(setCategories(categoriesArray));
			dispatch(fetchCategoriesStartAsync());
		};
		getCategoriesMap();
	}, [dispatch]);
	return (
		<Routes>
			<Route index element={<CategoriesPreview />} />
			<Route path=":category" element={<Category />} />
		</Routes>
	);
};

export default Shop;
