import { useDispatch, useSelector } from "react-redux";

import { selectCartItems } from "../../store/cart/cart.selector";
import {
	addItemToCart,
	removeItemFromCart,
	clearItemFromCart,
} from "../../store/cart/cart.action";

import {
	CheckoutItemContainer,
	CheckoutItemImageContainer,
	CheckoutItemImage,
	CheckoutItemName,
	CheckoutItemQuantity,
	CheckoutItemArrow,
	CheckoutItemValue,
	CheckoutItemPrice,
	CheckoutItemRemoveButton,
} from "./checkout-item.styles.jsx";

const CheckoutItem = ({ cartItem }) => {
	const dispatch = useDispatch();
	const cartItems = useSelector(selectCartItems);
	return (
		<CheckoutItemContainer>
			<CheckoutItemImageContainer>
				<CheckoutItemImage src={cartItem.imageUrl} alt={cartItem.name} />
			</CheckoutItemImageContainer>
			<CheckoutItemName>{cartItem.name}</CheckoutItemName>
			<CheckoutItemQuantity>
				<CheckoutItemArrow
					onClick={() => {
						dispatch(removeItemFromCart(cartItems, cartItem));
					}}
				>
					&#10094;
				</CheckoutItemArrow>
				{cartItem.quantity}
				<CheckoutItemArrow
					onClick={() => {
						dispatch(addItemToCart(cartItems, cartItem));
					}}
				>
					&#10095;
				</CheckoutItemArrow>
			</CheckoutItemQuantity>
			<CheckoutItemPrice>{cartItem.price}</CheckoutItemPrice>
			<CheckoutItemRemoveButton
				onClick={() => {
					dispatch(clearItemFromCart(cartItems, cartItem));
				}}
			>
				&#10005;
			</CheckoutItemRemoveButton>
		</CheckoutItemContainer>
	);
};

export default CheckoutItem;
