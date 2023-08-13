import { useContext } from "react";
import { useSelector } from "react-redux";

// import { CategoriesContext } from "../../contexts/categories.context";
import CategoryPreview from "../../components/category-preview/category-preview.component";

import { selectCategoriesMap } from "../../store/categories/categories.selector";

const CategoriesPreview = () => {
	// const { categoriesMap } = useContext(CategoriesContext);
	const categoriesMap = useSelector(selectCategoriesMap);
	return (
		<>
			{categoriesMap &&
				Object.keys(categoriesMap).map((category) => {
					const products = categoriesMap[category];
					return (
						<CategoryPreview
							key={category}
							category={category}
							products={products}
						/>
					);
				})}
		</>
	);
};

export default CategoriesPreview;
