import { Link } from "react-router-dom";

import ProductCard from "../product-card/product-card.component";

import {
	CategoryPreviewContainer,
	CategoryPreviewTitle,
	CategoryPreviewPreview,
} from "./category-preview.styles";

const CategoryPreview = ({ category, products }) => {
	return (
		<CategoryPreviewContainer className="category-preview-container">
			<h2>
				<CategoryPreviewTitle to={category}>
					{category.toUpperCase()}
				</CategoryPreviewTitle>
			</h2>
			<CategoryPreviewPreview>
				{products
					.filter((_, idx) => idx < 4)
					.map((product) => {
						return <ProductCard key={product?.id} product={product} />;
					})}
			</CategoryPreviewPreview>
		</CategoryPreviewContainer>
	);
};

export default CategoryPreview;
