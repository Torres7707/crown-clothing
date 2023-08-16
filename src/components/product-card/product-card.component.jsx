import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addItemToCart } from "../../store/cart/cart.action";
import { selectCartItems } from "../../store/cart/cart.selector";

// import { CartContext } from "../../contexts/cart.context";

import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";

import {
	ProductCardContainer,
	ProductCardImage,
	ProductCardFooter,
	ProductCardName,
	ProductCardPrice,
	ProductCardButton,
} from "./product-card.styles.jsx";

const ProductCard = ({ product }) => {
	const { name, imageUrl, price } = product;
	const dispatch = useDispatch();
	// const { addItemToCart } = useContext(CartContext);
	const cartItems = useSelector(selectCartItems);

	return (
		<ProductCardContainer>
			<ProductCardImage src={imageUrl} alt={name} />
			<ProductCardFooter>
				<ProductCardName>{name}</ProductCardName>
				<ProductCardPrice>{price}</ProductCardPrice>
			</ProductCardFooter>
			<ProductCardButton
				buttonType={BUTTON_TYPE_CLASSES.inverted}
				onClick={() => dispatch(addItemToCart(cartItems, product))}
			>
				Add to cart
			</ProductCardButton>
		</ProductCardContainer>
	);
};

export default ProductCard;
