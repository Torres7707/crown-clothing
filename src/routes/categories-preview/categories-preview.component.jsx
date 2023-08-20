import { useContext } from "react";
import { useSelector } from "react-redux";

// import { CategoriesContext } from "../../contexts/categories.context";
import CategoryPreview from "../../components/category-preview/category-preview.component";
import Spinner from "../../components/spinner/spinner.component";

import {
	selectCategoriesMap,
	selectIsCategoriesFetching,
} from "../../store/categories/categories.selector";

const CategoriesPreview = () => {
	// const { categoriesMap } = useContext(CategoriesContext);
	const categoriesMap = useSelector(selectCategoriesMap);
	const isFetching = useSelector(selectIsCategoriesFetching);

	return (
		<>
			{isFetching ? (
				<Spinner />
			) : (
				Object.keys(categoriesMap).map((category) => {
					const products = categoriesMap[category];
					return (
						<CategoryPreview
							key={category}
							category={category}
							products={products}
						/>
					);
				})
			)}
		</>
	);
};

export default CategoriesPreview;
