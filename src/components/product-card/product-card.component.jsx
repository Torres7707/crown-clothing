import Button from "../button/button.component";

import "./product-card.styles.scss";

const ProductCard = ({ product, addItemToCart }) => {
	const { name, imageUrl, price } = product;
	return (
		<div className="product-card-container">
			<img src={imageUrl} alt={name} />
			<div className="footer">
				<span className="name">{name}</span>
				<span className="price">{price}</span>
			</div>
			<Button buttonType="inverted" onClick={() => addItemToCart(product)}>
				Add to cart
			</Button>
		</div>
	);
};

export default ProductCard;
