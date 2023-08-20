import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

// import { CategoriesContext } from "../../contexts/categories.context";
import {
	selectCategoriesMap,
	selectIsCategoriesFetching,
} from "../../store/categories/categories.selector";

import ProductCard from "../../components/product-card/product-card.component";
import Spinner from "../../components/spinner/spinner.component";

import { CategoryContainer, CategoryTitle } from "./category.styles.jsx";

const Category = () => {
	const { category } = useParams();
	// const { categoriesMap } = useContext(CategoriesContext);
	const categoriesMap = useSelector(selectCategoriesMap);
	const isFetching = useSelector(selectIsCategoriesFetching);

	const [products, setProducts] = useState([]);

	useEffect(() => {
		if (categoriesMap?.[category]) {
			setProducts(categoriesMap[category]);
		} else {
			setProducts([]);
		}
	}, [category, categoriesMap]);

	return (
		<>
			<CategoryTitle>{category.toUpperCase()}</CategoryTitle>
			{isFetching ? (
				<Spinner />
			) : (
				<CategoryContainer>
					{products &&
						products.map((product) => (
							<ProductCard key={product?.id} product={product} />
						))}
				</CategoryContainer>
			)}
		</>
	);
};

export default Category;
