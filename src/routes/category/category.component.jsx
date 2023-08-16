import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

// import { CategoriesContext } from "../../contexts/categories.context";
import { selectCategoriesMap } from "../../store/categories/categories.selector";

import ProductCard from "../../components/product-card/product-card.component";

import { CategoryContainer, CategoryTitle } from "./category.styles.jsx";

const Category = () => {
	const { category } = useParams();
	// const { categoriesMap } = useContext(CategoriesContext);
	const categoriesMap = useSelector(selectCategoriesMap);

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
			<CategoryContainer>
				{products &&
					products.map((product) => (
						<ProductCard key={product?.id} product={product} />
					))}
			</CategoryContainer>
		</>
	);
};

export default Category;
