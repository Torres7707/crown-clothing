import { useContext, useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import { CategoriesContext } from "../../contexts/categories.context";

import "./category.styles.scss";
import ProductCard from "../../components/product-card/product-card.component";

const Category = () => {
	const { category } = useParams();
	const { categoriesMap } = useContext(CategoriesContext);
	const [products, setProducts] = useState([]);

	useEffect(() => {
		if (categoriesMap[category]) {
			setProducts(categoriesMap[category]);
		} else {
			setProducts([]);
		}
	}, [category, categoriesMap]);

	return (
		<>
			<h2 className="category-title">{category.toUpperCase()}</h2>
			<div className="category-container">
				{products &&
					products.map((product) => (
						<ProductCard key={product?.id} product={product} />
					))}
			</div>
		</>
	);
};

export default Category;
