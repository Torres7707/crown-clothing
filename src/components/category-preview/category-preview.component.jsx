import { Link } from "react-router-dom";

import ProductCard from "../product-card/product-card.component";

import "./category-preview.styles.scss";

const CategoryPreview = ({ category, products }) => {
	return (
		<div className="category-preview-container">
			<h2>
				<Link className="title" to={category}>
					{category.toUpperCase()}
				</Link>
			</h2>
			<div className="preview">
				{products
					.filter((_, idx) => idx < 4)
					.map((product) => {
						return <ProductCard key={product?.id} product={product} />;
					})}
			</div>
		</div>
	);
};

export default CategoryPreview;
